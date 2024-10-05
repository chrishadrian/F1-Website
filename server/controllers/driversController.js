const driversRepository = require('../repository/driversRepository')

async function getDriversBySeason(req, res) {
	const selectedSeason = req.params.season
	try {
		const getResult = await driversRepository.getDriversBySeason(selectedSeason);
		if (getResult) {
			res.json({ result: getResult });
		} else {
			res.status(500).json({ result: 'Failed getting drivers by season' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	getDriversBySeason
};