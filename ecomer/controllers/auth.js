const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const db = mysql.createConnection({  // MySQL connection setup
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = (req, res) => {
    const { email, password } = req.body;  // Get email and password from request body

    // Validate email format
    if (!validator.isEmail(email)) {
        return res.render('login', { message: 'Please enter a valid email address' });
    }

    // Check if the user exists in the database
    db.query('SELECT * FROM ussers WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error("Error during email check:", error);
            return res.status(500).send("Server error");
        }

        if (results.length === 0) {
            // If the user is not found, render the login page with an error message
            return res.render('login', { message: 'Invalid email or password' });
        }

        // Compare the entered password with the hashed password in the database
        const user = results[0]; // The user object

        // Check if passwords match
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            // If the password is incorrect, render the login page with an error message
            return res.render('login', { message: 'Invalid email or password' });
        }

        // Generate JWT token (you can use any other method for session management if needed)
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the token in the response (you can also store it in a cookie)
        // In this case, I'm sending it in the response body
        //return res.json({ message: 'Login successful', token: token });

        // Optionally, you can store the token in a cookie:
         res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        // Or redirect to another page after successful login
         return res.redirect('/');
    });
};

exports.register = async (req, res) => {
    console.log(req.body); // For debugging, remove this in production

    const { name, email, phone, password, confirm } = req.body;

    if (!validator.isEmail(email)) {
        return res.render('registration', { message: 'Please enter a valid email address' });
    }

    // Check if the email already exists
    db.query('SELECT email FROM ussers WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error("Error during email check:", error);
            return res.status(500).send("Server error"); // Return a server error if the query fails
        }

        if (results.length > 0) {
            // If the email is already taken, render the register page with an error message
            return res.render('registration', { message: 'That email is already taken' });
        }

        if (password !== confirm) {
            // If passwords do not match, render the register page with an error message
            return res.render('registration', { message: 'Passwords do not match' });
        }

        // Hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 8); // Hash the password with a salt rounds of 8
        } catch (err) {
            console.error("Error hashing password:", err);
            return res.status(500).send("Error hashing password");
        }

        // Save the new user in the database
        const query = 'INSERT INTO ussers (name, email, phone, password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, phone, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error during user insertion:", err);
                return res.status(500).send("Error registering user");
            }

            // Success, redirect or render a success message
            console.log("User registered successfully:", result);
            return res.render('registration', { message: 'Registration successful' });
        });
    });
};
/*const db = mysql.createConnection({  //sukuruiamas prisijungimas prie duomenu bases
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) => {
 console.log(req.body);
 const name = req.body.name;
 const email = req.body.email;
 const phone = req.body.phone;
 const password = req.body.password;
 const passwordconfirm = req.body.confirm;

 db.query('SELECT email FROM ussers WHERE email = ?', [email], async (error, results) =>{
    if(error){
        console.log(error);
    }

    if (results.length > 0) {
        return res.render('registration' , { message: ' Thaht email is already taken'

        })
    } else if ( password !== passwordconfirm) {
        return res.render('registration', {
            message: 'passwords dont match'
        });
    }

    let hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    db.query
 });



}*/