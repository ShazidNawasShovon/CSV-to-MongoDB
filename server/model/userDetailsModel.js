const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userDetailsSchema = new Schema({
    first_name: {
        type : String,
        requried : true
    },
    last_name: {
        type: String,
        required: true 
    },
    emailId: {
        type: String,
        requried: true,
        index: {
            unique: true 
        }
    }
},{ timestamps: true })

const userDetails = mongoose.model('UserDetails', userDetailsSchema);

module.exports = userDetails
