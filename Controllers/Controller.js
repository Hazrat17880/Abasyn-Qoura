const { toFloat } = require("validator");
const UserModel = require("../UserModels/UserModel");
const questionmodel = require('../UserModels/UserModel');
const multer = require('multer');
const jwt = require("jsonwebtoken");

// Function for error handling 
// Function for error handling 
const errorHandler = (err) => {
    let errors = { firstNameError: "", lastNameError: "", emailError: "", phoneError: "", passwordError: "" };
    console.log(err.message, err.code);


    // check for duplication email 
    if(err.code ===11000){
        errors.emailError="this User is already Exist"
        errors.phoneError="this number is already registered"
    }

    // Checking password for login process 
    if(err.message==="Incorrect Password"){
        errors.passwordError="Incorrect Password";
    }

    if(err.message==="Email Address Does not Exist"){
        errors.emailError="Email Address Does not Exist"
    }

    if(err.message.includes("Registration Table validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path + "Error"] = properties.message; // Corrected path and setting message
        })
    }
    return errors;
}

// Function to create JWT token
const maxAge = 1 * 20 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id},"usman secrey key",{expiresIn:maxAge})
};



// Controller functions
module.exports.RenderHome = (req, res) => {
    res.render("home")
}

module.exports.Registration_get = (req, res) => {
    res.render("signup")
}

module.exports.Registration_post = async (req, res) => {
    const { firstname, lastname, email, phone, password } = req.body;
    try {
    
        const user = await UserModel.create({ firstname, lastname, phone, email, password });
        if(user){
            const token = createToken(user._id);
            res.cookie("jwt",token,{maxAge:maxAge*1000});
            res.status(200).json({ user })
       
        }else{
            res.staus(400).json({
                message:"user data does not inserted",
                success:false
            })
        }
        

    } catch (e) {
        const errors = errorHandler(e);
        res.status(400).json({errors})
        console.log("user data does not inserted")
    }
}


module.exports.Login_get = (req, res) => {
    res.render("login")
}
module.exports.Login_post = async(req, res) => {
    const {email,password} = req.body;
    try {
        const user = await UserModel.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json({ errors });
    }
}



/// the method for handling question uploading 

module.exports.question_Upload =async (req,res)=>{


    const {questionDescription} = req.body;
    try{
        const questionUser = await questionmodel.create({questionDescription});
        if(user){
            console.log("the user question is successfully inserted");
            console.log(questionUser)
           
            
        }else{
            console.log("there is some problem while asking the qustion");
            res.status(400).json({
                message:"user data does not inserted",
                success:false
            })
        }

    }catch(e){
    console.log("user data does not insertd",e);
    }

}