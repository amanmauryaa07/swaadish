const mongoosee = require('mongoose');

const userSchema = new mongoosee.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    }
},
    { timestamps: true }
)

const userModel = mongoosee.model('User', userSchema);

module.exports = userModel;