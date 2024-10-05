const express = require('express');
const driversController = require('../controllers/driversController');

const router = express.Router();

router.get("/seasons/:season", driversController.getDriversBySeason);

module.exports = router;