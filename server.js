require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid'); // Need to install uuid

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
const dbPath = process.env.DATABASE_PATH || path.resolve(__dirname, 'backend/db/bookings.db');
const db = new sqlite3.Database(dbPath);

// Routes

// 1. Create Booking
app.post('/api/create-booking', (req, res) => {
    const { fullName, phone, email, service, price, addOns, bookingDate, timeSlot } = req.body;
    
    if (!fullName || !phone || !service || !bookingDate || !timeSlot) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const bookingId = Math.random().toString(36).substr(2, 9).toUpperCase(); // Simple readable ID

    const sql = `INSERT INTO bookings (id, fullName, phone, email, service, price, addOns, bookingDate, timeSlot) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(sql, [bookingId, fullName, phone, email, service, price, JSON.stringify(addOns), bookingDate, timeSlot], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Failed to create booking' });
        }
        res.status(201).json({ 
            success: true, 
            bookingId, 
            message: 'Booking created successfully' 
        });
    });
});

// 2. Get Booking Details (Customer Manage Portal)
app.post('/api/get-booking', (req, res) => {
    const { bookingId, phone } = req.body;
    
    const sql = `SELECT * FROM bookings WHERE id = ? AND phone = ?`;
    db.get(sql, [bookingId, phone], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(row);
    });
});

// 3. Cancel Booking
app.post('/api/cancel-booking', (req, res) => {
    const { bookingId, phone, reason } = req.body;
    
    if (!reason) {
        return res.status(400).json({ error: 'Cancellation reason is required' });
    }

    const timestamp = new Date().toISOString();
    const sql = `UPDATE bookings SET status = 'cancelled', cancellationReason = ?, cancelledAt = ? 
                 WHERE id = ? AND phone = ? AND status = 'upcoming'`;
    
    db.run(sql, [reason, timestamp, bookingId, phone], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Booking not found or already cancelled' });
        }
        res.json({ success: true, message: 'Booking cancelled successfully' });
    });
});

// 4. Admin Login
app.post('/api/admin-login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
        res.json({ success: true, token: 'fake-jwt-token-for-demo' });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// 5. Admin Get All Appointments
app.get('/api/get-appointments', (req, res) => {
    // In a real app, we would verify the token here
    const sql = `SELECT * FROM bookings ORDER BY bookingDate DESC, timeSlot DESC`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
