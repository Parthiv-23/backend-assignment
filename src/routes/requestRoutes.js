const express = require('express');
const router = express.Router();
const { handleRequest } = require('../controllers/requestController');

// POST /request
router.post('/', handleRequest);

module.exports = router;
