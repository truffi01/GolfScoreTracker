const mongoose = require("mongoose"); 

const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String, 
        required: True
    },
    LastName: {
        type: String, 
        required: True
    },
    Email: {
        type: String, 
        required: True
    },
    Password: {
        type: String, 
        required: True
    },
});

const User = mongoose.model("User", UserSchema);

module.exports = User; 