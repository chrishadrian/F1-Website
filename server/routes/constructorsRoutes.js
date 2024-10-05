const express = require('express');
const constructorsController = require('../controllers/constructorsController');

const router = express.Router();

router.get("/seasons/:season", constructorsController.getConstructorsBySeason);
router.get("/championships/:chips", constructorsController.getConstructorXRaceWins);
router.get("/totalConstructorRaces", constructorsController.totalConstructorRaces);
router.get("/ranks/:rank", constructorsController.getConstructorsThatPlacedXthEverySeason);
router.put("/team", constructorsController.updateTeamPrincipalAndChips);

module.exports = router;