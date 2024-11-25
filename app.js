const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const session = require('express-session');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Default XAMPP user
    password: '', // Default XAMPP password (usually empty)
    database: 'userDB', // Your database name
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Send index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Registration Route
app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // Check if username or email already exists
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, results) => {
        if (err) return res.status(500).send('Error checking username or email');
        
        if (results.length > 0) {
            return res.status(400).send('Username or email already taken');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const sql = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        db.query(sql, [username, hashedPassword, email], (err) => {
            if (err) return res.status(400).send('Error registering user');
            res.status(201).send('User registered!');
        });
    });
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(500).send('Error fetching user');
        
        if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
            return res.status(401).send('Invalid credentials');
        }

        req.session.userId = results[0].id;
        res.send('Login successful!');
    });
});

// Forgot Password Route
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) return res.status(500).send('Error checking for email');
        
        if (result.length === 0) {
            return res.status(400).send('No account with that email exists.');
        }

        // Generate reset token and save in the database
        const token = crypto.randomBytes(20).toString('hex');
        const expireDate = Date.now() + 3600000; // Token valid for 1 hour

        db.query('UPDATE users SET resetToken = ?, resetTokenExpire = ? WHERE email = ?', [token, expireDate, email], (err) => {
            if (err) return res.status(500).send('Error generating reset token');

            // Send reset email
            const resetLink = `http://localhost:3000/reset-password/${token}`;
            sendResetEmail(email, resetLink);

            res.send('Password reset link sent to your email.');
        });
    });
});

// Password Reset Route
app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    db.query('SELECT * FROM users WHERE resetToken = ? AND resetTokenExpire > NOW()', [token], async (err, results) => {
        if (err) return res.status(500).send('Error finding token');
        
        if (results.length === 0) {
            return res.status(400).send('Token is invalid or has expired');
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password in the database
        db.query('UPDATE users SET password = ?, resetToken = NULL, resetTokenExpire = NULL WHERE resetToken = ?', [hashedPassword, token], (err) => {
            if (err) return res.status(500).send('Error resetting password');
            res.send('Password has been reset!');
        });
    });
});

// Nodemailer - Send Password Reset Email
const sendResetEmail = (to, resetLink) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // replace with your email
            pass: 'your-email-password', // replace with your password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log(`Email sent: ${info.response}`);
    });
};

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});








