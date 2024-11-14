const express = require('express')
const router = express.Router()

const userDetailsController = require('../controller/userDetailsController')

router.post('/create', userDetailsController.createUserDetails);


module.exports = router