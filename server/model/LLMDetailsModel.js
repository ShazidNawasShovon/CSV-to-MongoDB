const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const LLMDetailsSchema = new Schema({
    question: {
        type : String,
        requried : true
    },
    answer_1: {
        type: String,
        // required: true 
    },
    answer_2: {
        type: String,
        // required: true 
    },
    answer_3: {
        type: String,
        // required: true 
    },
    answer_4: {
        type: String,
    },
    student_answer: {
        type: String,
        required: true,
        /* index: {
            unique: true 
        } */
    }
},{ timestamps: true })

// const LLMDetails = mongoose.model('LLMDetails', LLMDetailsModel);
const LLMDetailsModel = mongoose.models.LLMDetails ?? mongoose.model('LLMDetails', LLMDetailsSchema);

// module.exports = LLMDetails
module.exports = LLMDetailsModel
