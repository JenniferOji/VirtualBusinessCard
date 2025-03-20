require('dotenv').config();  
const express = require('express');
const app = express();
const port = process.env.PORT;

const cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // increasing the limit the 
app.use(bodyParser.json({ limit: '10mb' })); // increasing the limit for the json to store images 


const mongoose = require('mongoose');
// connecting to mongoose database with the value in the .env file   
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// creating a scehma in the database for all the newly registered users - the values the schema will hold 
const accountsSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    create: String,
    qrCode: String,
    profile: {
        title: String,
        description: String
    },
    dynamic: {
        html: String,
        css: String
    }
});

const AccountModel = mongoose.model('Account', accountsSchema);

// creating the users account
app.post('/register', async (req, res) => {
    // pulling the email and password out of the request body 
    const { username, email, password, create, qrCode, profile, dynamic} = req.body;
  
    try {    
        // creating a new account and saving it to the database model
        const newAccount = new AccountModel({ username, email, password, create, qrCode, profile, dynamic });
        await newAccount.save();
        console.log("Account created successfully")
        // creating the account and sending back the users profile id so they can be redirected to the profile page 
        res.status(201).json({ message: "Account created successfully",  id: newAccount._id   });
    } catch (error) {
        console.error("Error:", error); 
        res.status(500).json({ message: "Server Error" });
    }
});

// retrieving a specifc user by email and password
app.post('/login', async (req, res) => {
    // pulling the email and the password out of the request body 
    const { email, password } = req.body;
    
    try {
        // searching the database for the email and password in the request body and assigning it to account
        const account = await AccountModel.findOne({ email, password }); 
        // if the account doesnt exist it alerts the user 
        if (!account) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        // if the account exists it allows the user to continue - sends back the users account id so they can be redirected to their create page 
        res.status(200).json({ message: "Log in successful", id: account._id  });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});
 
// loading current data to the user professional profile page
app.get('/templates/professional/:id', async (req, res) => {
    // when the professional page is loading it retrives tbe users specific id to display their profile data
    try{
        //seraching the databse for the account by its id
        const account = await AccountModel.findById(req.params.id);
        // sending back the users profile data
        res.json({ profile: account.profile });
    } catch (error) {
        console.error("Error getting profile:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// loading the professional profile page on the users id 
app.post('/templates/professional/profile/:id', async (req, res) => {
    const { id } = req.params; 
    const { profile } = req.body; 

    try {
        const updatedUserProfile = await AccountModel.findByIdAndUpdate(
            id, { profile }, // updating the profile field 
            { new: true, runValidators: true } // returning the updated document
        );

        if (!updatedUserProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUserProfile });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// loading the professional profile page on the users id 
app.post('/templates/professional/profile/:id', async (req, res) => {
    const { id } = req.params; 
    const { profile } = req.body; 

    try {
        const updatedUserProfile = await AccountModel.findByIdAndUpdate(
            id, { profile }, // updating the profile field 
            { new: true, runValidators: true } // returning the updated document
        );

        if (!updatedUserProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user: updatedUserProfile });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// saving the format of the dynamic template from the user 
app.post('/saveTemplate/:id', async (req, res) => {
    const { id } = req.params; 
    const {html, css } = req.body; // extracting {html, css}

    try {
        const updatedUser = await AccountModel.findByIdAndUpdate(
            id, { dynamic : {html, css}}, // updating the dynamic field in the database 
            { new: true, runValidators: true } // returning the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Failed to save" });
        }

        res.status(200).json({ message: "Saved template", user: updatedUser });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// getting the saved dynamic portfolio data for the user
app.get('/dynamic/portfolio/:id', async (req, res) => {
    const { id } = req.params; // getting the id from the url header 

    try {
        const account = await AccountModel.findById(id);
        
        if (!account) {
            return res.status(404).json({ message: "No portfolio found" });
        }

        // sending back the html and css from the users account
        res.status(200).json({ user: { html: account.dynamic.html, css: account.dynamic.css } });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


app.get("/", (req, res) => {
    res.send("Virtual Business Card running successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});