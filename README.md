# GLAM AND BLINK BY ARORA - Booking System

A professional booking website for a luxury lash extension business. Built with HTML, CSS, and JavaScript for the front-end, and Node.js + Express for the back-end with SQLite for data persistence.

## Features

- **Business Branding**: Luxury, clean, aesthetic, and modern design.
- **Service Selection**: Browse lash extension services with pricing and add-ons.
- **Booking System**: Select date and time slots, collect customer details, and confirm bookings.
- **Customer Portal**: Search, view, and cancel bookings using Booking ID and phone number.
- **Admin Dashboard**: View all appointments (upcoming, past, cancelled), search, and filter.
- **Persistence**: Bookings are stored in a local SQLite database.

## Project Structure

```text
glam-and-blink/
├── backend/
│   ├── db/
│   │   ├── bookings.db      # SQLite database file
│   │   └── init.js          # Database initialization script
│   └── routes/              # (Routes are currently in server.js for simplicity)
├── public/                  # Front-end files
│   ├── admin.html           # Admin Dashboard
│   ├── booking.html         # Booking Form
│   ├── index.html           # Home Page
│   ├── manage.html          # Customer Portal
│   ├── services.html        # Service Menu
│   └── styles.css           # Shared Styles
├── .env                     # Environment variables
├── package.json             # Node.js dependencies
├── README.md                # This file
└── server.js                # Express server and API routes
```

## Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### 2. Installation
1. Extract the ZIP file.
2. Open your terminal/command prompt in the `glam-and-blink` folder.
3. Run the following command to install dependencies:
   ```bash
   npm install
   ```

### 3. Configuration
Create a `.env` file in the root directory (optional, defaults are provided):
```env
PORT=3000
ADMIN_PASSWORD=admin123
```

### 4. Running the Project
Start the server:
```bash
npm start
```
The website will be available at: [http://localhost:3000](http://localhost:3000)

## Admin Access
- **URL**: `http://localhost:3000/admin.html`
- **Default Password**: `admin123`

## How it Works
- **Front-end**: Pure HTML/CSS/JS using the Fetch API to communicate with the back-end.
- **Back-end**: Express server handles API requests and interacts with the SQLite database.
- **Database**: SQLite stores all booking information locally in `backend/db/bookings.db`.

## Note on Payments
Online payments are NOT implemented as per requirements. The system informs users that "Payment will be made on arrival." The code is structured to allow for future integration of payment gateways like Paystack or Flutterwave.
