const express = require("express");
const dbconnection = require("./Database/database");
const router = require("./Router/Routes")
const port =process.env.PORT || 220;
const app  = express();


// set the middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("",router);
const bodyParser = require("body-parser"); 
app.use(bodyParser.json());

// set the view engine
app.set("view engine",'ejs')

// set the staic file coding 
app.use(express.static('public'))







app.listen(port,()=>{
    console.log(`Server Connected at ${port}`)
})