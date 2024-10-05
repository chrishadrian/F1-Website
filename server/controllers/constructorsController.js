const constructorsRepository = require('../repository/constructorsRepository')

async function getConstructorsBySeason(req, res) {
	const selectedSeason = req.params.season;
	try {
		const getResults = await constructorsRepository.getConstructorsBySeason(selectedSeason);
		if (getResults) {
			res.json({ result: getResults });
		} else {
			res.status(500).json({ error: 'Failed getting constructors by season' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

// search for a constructor that has X or more race wins
async function getConstructorXRaceWins(req, res) {
	const numWin = req.params.chips;
	try {
		const getResults = await constructorsRepository.getConstructorXRaceWins(parseInt(numWin));
		if (getResults) {
			res.json({ result: getResults });
		} else {
			res.status(500).json({ error: 'Failed getting a consturctor with inputted race wins' });;
		}
	} catch (erorr) {
		res.status(500).json({ error: error.message });
	}
};

async function totalConstructorRaces(req, res) {
	try {
		const getResults = await constructorsRepository.totalConstructorRaces();
		if (getResults) {
			res.json({ result: getResults });
		} else {
			res.status(500).json({ error: 'Failed to get total constructor races' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });

	}
};

async function getConstructorsThatPlacedXthEverySeason(req, res) {
	const selectedRank = req.params.rank;
	try {
		const getResults = await constructorsRepository.getConstructorsThatPlacedXthEverySeason(parseInt(selectedRank));
		if (getResults) {
			res.json({ result: getResults });
		} else {
			res.status(500).json({ error: 'Failed to get constructors that place in that position every season' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });

	}
};

async function updateTeamPrincipalAndChips(req, res) {
	const { newTeamPrincipal, newChampionships, name } = req.body;
	try {
		const updateResult = await constructorsRepository.updateTeamPrincipalAndChips(newTeamPrincipal, parseInt(newChampionships), name);
		res.json({ result: updateResult ? 'Success' : 'Fail' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = {
	getConstructorsBySeason,
	getConstructorXRaceWins,
	totalConstructorRaces,
	getConstructorsThatPlacedXthEverySeason,
	updateTeamPrincipalAndChips
};