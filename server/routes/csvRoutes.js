const express = require('express');
const router = express.Router();
const csvController = require('../controller/csvController');

// Define the route to handle CSV uploads
router.post('/upload-csv', csvController.uploadCsvData);

module.exports = router;
