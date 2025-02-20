const express = require('express');
const app = express();
const port = 4000;

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const mongoose = require('mongoose');
// connecting to mongoose database with my connection string  
mongoose.connect('mongodb+srv://admin:admin@cluster0.sqwxk.mongodb.net/Accounts');

// creating a scehma in the database for all the newly registered users - the values the schema will hold 
const accountsSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const AccountModel = mongoose.model('Account', accountsSchema);

// handling the post request on register
app.post('/register', async (req, res) => {
    // pulling the email and password out of the request body 
    const { email, password } = req.body;
  
    try {    
        // creating a new account and saving it to the database model
        const newAccount = new AccountModel({ email, password });
        await newAccount.save();
        console.log("Account created successfully")
    } catch (error) {
        // outputting the error to the console for better readability 
        console.error("Error creating account:", error);
    }
  });
  
// the server listening on port 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


