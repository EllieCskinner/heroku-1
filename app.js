// Import required modules
const express = require('express');

// Create an instance of the Express application 
//--> on that variable we can begin to do things

const app = express();

// '/' specifies home page, req, res means request and response (which part of url we're listening for)
//app is our instance of the express package
//'get' specifies which type of request we're listening for (default when you visit a site in your browser)

/*app.get('/', (req, res)=>{
    res.send("Welcome to the homepage!") //function we want to run in response to that request
})*/

//each one of these is a different route
app.get('/about', (req, res)=>{
    res.send("I'm Ellie :)")
})//express will call this function at the appropriate time (when the get request happens) & pass in two args (request & response)
//1st thing express passes in = an object that represents incoming request from visitor
//2nd = response object where we can do a bunch of useful things (res.send allows us to send a response back to user)


//can use middleware functs for individual routes OR you can call app.use to use function for all routes
app.use(express.urlencoded({extended: false}))
//^Looks at body of post request, and adds conveniently named properties 
//to our request.body object --> makes it aesy to access values the user just inputted!
//now in our post request we can access user's input req.body.color

//route: app.get("/",)
//when defining a route you can list as many functions as you want

function getWeather(req, res, next){
    req.visitorWeather = false      //now we can access this req.visitorWeather property of the req object
    if(req.visitorWeather){
        res.send("Come back when it ain't raining")
    }else{
        next()  //move onto next function for a given route
    }
}

//middleware: just a function (as many as you want for a route) and be sure to call next to express moves onto next function
app.get("/", getWeather, (req, res)=>{  //we're gonna need to set up a new route in express calles /result
    res.send(`
    <h1>Guess my favorite color :) </h1>
    <form action ="/result" method = "POST"> 
        <input type="text" name="color">
        <button>Submit Answer</buton>
    </form>
    <p>${req.visitorWeather ? 'It is raining' : 'It is not raining'}</p>
    `)
}) //Default is a "GET" request --> Browser will take user's input value and add it into the url
//if we send a POST request, the user's values will live in body of request, not in the url
//when user visits this page and submits this form, their browser will send a POST request to this url
//SO we need to set up a route to this address

app.post("/result", (req, res)=>{
    if(req.body.color.trim().toUpperCase() == "GREEN"){
        res.send("Correct!")
    }else{
        res.send("Not quite.  Try again!")
    }
})

// Start the server
const port = 3000; // Specify the port number you want to run this application on

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });