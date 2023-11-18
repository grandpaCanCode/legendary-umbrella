const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

//Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(express.static('C:/Users/Tuff/Desktop/betterPortfolio/html5up-prologue'));

//Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', ()=> {
    console.log("Connected to MongoDB")
});

const contactSchema = new mongoose.Schema({
    first: String,
    last: String,
    email: String,
    message: String,
})
const Contact = mongoose.model("Contact", contactSchema)
app.post('/submit', async (req, res) => {
    const formData = {
        first:req.body.first,   
        last:req.body.last,
        email:req.body.email,
        message:req.body.message
    }
    try{
        const newContact = new Contact(formData)
        await newContact.save()
        res.redirect('/?success')
    }catch (error){
        res.redirect('/?error')
    }
});
app.get('/', (req, res)=> {
    res.sendFile('C:/Users/Tuff/Desktop/betterPortfolio/html5up-prologue/index.html')
});
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server connected on ${PORT}`)
})