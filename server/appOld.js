const express = require('express')
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const upload = require("express-fileupload");

// mongodb+srv://LLM-Dastabase:12345@cluster0.ijm0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;
// Connect to MongoDB Atlas

// const DBURL = "mongodb+srv://reach:6j4oL1qRidm6Klix@cluster0.rwt30.mongodb.net/?retryWrites=true&w=majority"
const DBURL = "mongodb+srv://LLM-Dastabase:12345@cluster0.ijm0a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app.use(cors())
app.use(express.urlencoded({ extended : true}));
app.use(express.json())
app.use(upload())

mongoose.connect(DBURL, {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true,})
    .then(result => app.listen(3500, ()=>{
        console.log("app is running on the port 3500");
    }))
    .catch(err => console.log(err))

app.use('/users', userRoutes);

app.get('/', (req,res)=> {
    res.send("hello world")
})

