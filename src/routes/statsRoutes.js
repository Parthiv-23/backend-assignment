const express = require('express');
const router = express.Router();
const { handleGetStats } = require('../controllers/statsController');

// GET /stats
router.get('/', handleGetStats);

module.exports = router;
