//jshint esversion:6
require('dotenv').config(); // right at the top is referred to be written
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
// const { PORT, mongoDBURL } = require('./config.js');
const { default: mongoose } = require('mongoose');
const User = require('./models/userModel.js');

const app = express();

// console.log(process.env.PORT, process.env.MONGODB_URL); // This is how we received different secrets from .env file

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', async (req, res) => {
    const newUser = {
        email: req.body.username,
        password: req.body.password
    };
    const user = await User.create(newUser);
    if(user){
        res.render('secrets');
    }
})

app.post('/login', async (req, res) => {
    const user = {
        email: req.body.username,
        password: req.body.password
    }
    User.findOne({email: user.email})
        .then((foundUser) => {
            if(foundUser.password == user.password){
                res.render('secrets');
            }else{
                res.status(401).send("Wrong Password!");
            }
        })
        .catch((error) => {
            console.log(error);
        })
});

const PORT = process.env.PORT, mongoDBURL = process.env.MONGODB_URL;
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Database connnected!");
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })