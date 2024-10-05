const express = require('express');
const resultsController = require('../controllers/resultsController');

const router = express.Router();

router.get("/seasons/:season", resultsController.getResultsBySeason);
router.get("/tracks/:track/seasons/:season", resultsController.getResultsByTrackAndSeason);
router.get("/maxAvgLapTime", resultsController.getMaxAvgLapTime);
router.post("/result", resultsController.insertResult);
router.put("/driverName", resultsController.updateDriverName);
router.delete("/result", resultsController.deleteResultByKeys);

module.exports = router;