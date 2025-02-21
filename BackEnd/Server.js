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
    profile: String
});

const AccountModel = mongoose.model('Account', accountsSchema);

// handling the post request on register
app.post('/register', async (req, res) => {
    // pulling the email and password out of the request body 
    const { email, password, profile } = req.body;
  
    try {    
        // creating a new account and saving it to the database model
        const newAccount = new AccountModel({ email, password, profile });
        await newAccount.save();
        console.log("Account created successfully")
        // creating the account and sending back the users profile id so they can be redirected to the profile page 
        res.status(201).json({ message: "Account created successfully",  id: newAccount._id   });
    } catch (error) {
        // outputting the error to the console for better readability 
        console.error("Error:", error); 
        res.status(500).json({ message: "Server Error" });
    }
});

// retrieving a specifc user by emial and password
app.post('/login', async (req, res) => {
    // pulling the email and the password out of the request body 
    const { email, password } = req.body;
    

    try {
        // searching the database for the email and password in the request body and assigning it to account if it exists 
        const account = await AccountModel.findOne({ email, password }); 
        // if the account doesnt exist it alerts the user 
        if (!account) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        // if the account exists it allows the user to continue - sends back the users profile id so they can be redirected to their profile page 
        res.status(200).json({ message: "Log in successful", id: account._id  });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// loading the profile page on the users id 
app.get('/profile/:id', async (req, res) => {
    // when the profile page is loading it retrives tbe users specific id to display their profile  
    try{
        //seraching the databse for the account by its id
        const account = await AccountModel.findById(req.params.id);
        // sending back the html from the users profile 
        res.json({ profile: account.profile });
      } catch (error) {
        console.error("Error getting profile:", error);
        res.status(500).json({ message: "Server Error" });
      }
});
  
// the server listening on port 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


