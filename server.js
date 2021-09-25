// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const myport = 5000;
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));



app.get('/project',(req,res) => {
    res.send(projectData)
});

app.post('/project',(req,res) =>{
    projectData=req.body
    res.status(201).send(projectData)
    console.log(projectData)
})

// Setup Server
app.listen(myport,()=>{
    console.log(`server is running well on port ${myport}`)
})