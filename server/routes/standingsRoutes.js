const express = require('express');
const standingsController = require('../controllers/standingsController');

const router = express.Router();

router.get("/constructors/:season", standingsController.getConstructorsStanding);
router.get("/drivers/:season", standingsController.getDriversStanding);

module.exports = router;