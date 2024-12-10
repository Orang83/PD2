

const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const hbs = require("hbs");

dotenv.config({ path: './.env'});

const app = express();

const db = mysql.createConnection({  //sukuruiamas prisijungimas prie duomenu bases
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory))

app.set('view engine', 'hbs');

db.connect((error) =>{   //tikrinama ar prisijungta
    if(error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

//define rouotes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'))



app.listen(5000, ( )=>{
    console.log("server started on port 5000")
})
