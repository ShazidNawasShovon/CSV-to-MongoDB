const express = require('express')
const router = express.Router()

const LLMDetailsController = require('../controller/LLMDetailsController')

router.post('/create', LLMDetailsController.createLLMDetails);


module.exports = router