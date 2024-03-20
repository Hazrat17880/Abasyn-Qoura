const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter the first name']
    },
    lastname: {
        type: String,
        required: [true, 'Please enter the last name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email address'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Please enter the phone number'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter the password'],
        minLength: [6, 'Password must be at least 6 characters long']
    }
});
















UserSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
       console.log(error)
    }
});





UserSchema.statics.login = async function(email, password) {
    try {
        const user = await this.findOne({ email });
        if (!user) {
            throw new Error("Email Address Does not Exist");
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            throw new Error("Incorrect Password");
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const RegistrationModel = mongoose.model("Registration Table", UserSchema);
module.exports = RegistrationModel;

