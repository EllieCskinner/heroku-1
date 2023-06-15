// Import required modules
const express = require('express');

// Create an instance of the Express application 
//--> on that variable we can begin to do things

const app = express();

// '/' specifies home page, req, res means request and response
app.get('/', (req, res)=>{
    res.send("Welcome to the homepage!")
})
app.get('/about', (req, res)=>{
    res.send("I'm Ellie :)")
})
// Start the server
const port = 3000; // Specify the port number you want to run this application on

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });