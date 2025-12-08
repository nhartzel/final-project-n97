const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const verifyToken = require('./authMiddleware');

// pull environment variables
require('dotenv').config();


// set up dependencies for hosting
const port = process.env.port || 3000;
const app = express();
app.use(cors())
app.use(express.json());

// establish database connection pool
var pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    ssl: { "rejectUnauthorized": false }
});


// Load the secret key
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in the environment variables.");
    process.exit(1);
}

// Login API route
app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;

    // construct parametized query to fetch users
    const sql = "SELECT password FROM user WHERE username = ?";
    const vals = [username]
    // query database for request's username/password combination
    pool.query(sql, vals, (err, results) => {
        if (err) { throw err; }

        if (results.length === 0) {
            return res.status(401).json({
                success: false,
                message: "no user found"
            });
        }

        // fetch user's stored hashed password
        const db_pwd = results[0].password;
        // compare request's password to DB password
        bcrypt.compare(password, db_pwd, (err, isMatch) => {
            // return a good status and JWT token if login is successful
            if (isMatch) {
                // craft JWT payload
                const payload = { 
                    username: username,
                };
                
                // generate the token
                const token = jwt.sign(
                    payload,        
                    jwtSecret,        
                    { expiresIn: '5m' } 
                );
                // returned JSON with good status and token
                res.status(200).json({
                    success: true,
                    message: "found matching credentials",
                    username: username,
                    token: token
                });
                console.log("user logged in and JWT generated");
            // return bad response
            } else {
                res.status(500).json({
                    success: false,
                    message: "something went wrong lol"
                });
                console.log("error logging in user");
            }
        })
    })

});

// API route for handling signup
app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;

    // Validation: Fail fast if data is missing
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing username or password"
        });
    }

    try {
        // Hash the Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const date = new Date();

        // 3. Database Insertion
        // uses MySQL's 'UNIQUE' constraint to handle the duplicate check for us.
        const sql = 'INSERT INTO user (username, password, signedup) VALUES (?, ?, ?)';
        const values = [username, hashedPassword, date];

        pool.query(sql, values, (error, results) => {
            // A. Handle Errors
            if (error) {
                // Check specifically for duplicate username error code (MySQL 1062)
                if (error.code === 'ER_DUP_ENTRY') {
                    console.log("duplicate username failure");
                    return res.status(409).json({ 
                        success: false, 
                        message: "Username already taken." 
                    });
                }
                // return bad JSON status for signup error
                console.error("Signup DB Error:", error);
                return res.status(500).json({ 
                    success: false, 
                    message: "Database error during signup." 
                });
            }

            // Generate the Token on success (Auto-Login)
            const tokenPayload = { 
                id: results.insertId, 
                username: username 
            };

            const token = jwt.sign(
                tokenPayload, 
                process.env.JWT_SECRET, 
                { expiresIn: '5m' } // 5 minute time to live on token
            );

            // Send Response
            res.status(201).json({ 
                success: true, 
                message: 'User created successfully!',
                user: { id: results.insertId, username: username },
                token: token // Frontend saves this and redirects to Dashboard
            });
        });

    } catch (err) {
        // Catch bcrypt or general server errors
        console.error("Server Error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// API route to serve chart data for summary page
app.get('/api/chart/summary', verifyToken, (req, res) => {
    const sql = 'SELECT label, value FROM summary_chart';
    // fetch chart data from database
    pool.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching data" });
        }
        // returns the JSON data of query results
        res.json(results);
    });
});

// 
app.get('/api/chart/reports', verifyToken, (req, res) => {
    // "SELECT label AS name" automatically renames the key in the JSON response
    // makes it useable as-is for rechart pie chart
    const sql = 'SELECT label AS name, value FROM reports_chart';
    // query database for chart data
    pool.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Error fetching data" });
        }
        // return name: x value: y JSON for reports pie chart
        res.json(results);
    });
});

// listen on port 3000
const server = app.listen(port, () => {
    console.log(`server on port ${port}`);
});

// shutdown procedure to safely close database pool on SIGINT
process.on('SIGINT', () => {
    console.log('\nReceived SIGINT signal. Starting graceful shutdown...');
    server.close(() => {
        console.log('HTTP server closed.');

        pool.end((err) => {
            if (err) {
                console.error('Error closing database pool:', err.stack);
                process.exit(1); 
            }
            console.log('Database pool closed.');
            process.exit(0); 
        });
    });
});