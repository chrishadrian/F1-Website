const standingsRepository = require('../repository/standingsRepository')

async function getConstructorsStanding(req, res) {
	const selectedSeason = req.params.season;
	try {
		const lastStandingID = await standingsRepository.getLastStandingIDBySeason(selectedSeason);
		const getResult = await standingsRepository.getConstructorsStandingByKeys(selectedSeason, lastStandingID);
		if (getResult) {
			res.json({ result: getResult });
		} else {
			res.status(500).json({ result: 'Failed to get constructors standing' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getDriversStanding(req, res) {
	const selectedSeason = req.params.season;
	try {
		const lastStandingID = await standingsRepository.getLastStandingIDBySeason(selectedSeason);
		const getResult = await standingsRepository.getDriversStandingByKeys(selectedSeason, lastStandingID);
		if (getResult) {
			res.json({ result: getResult });
		} else {
			res.status(500).json({ result: 'Failed to get drivers standing' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

// async function selectCertainAttributesForConstructor(req, res) {
// 	const selectedSeason = req.params.season;
// 	const getResult = await standingsRepository.selectCertainAttributesForConstructor();
// 	if (getResult) {
// 		res.json({ result: getResult });
// 	} else {
// 		res.status(500).json({ error: error.message });
// 	}
// }

module.exports = {
	getConstructorsStanding,
	getDriversStanding
};