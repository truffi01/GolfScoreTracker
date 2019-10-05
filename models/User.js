const mongoose = require("mongoose"); 

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String, 
        required: true
    },
    LastName: {
        type: String, 
        required: true
    },
    Email: {
        type: String, 
        required: true
    },
    Password: {
        type: String, 
        required: true
    },
    Password2: {
        type: String, 
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User; 