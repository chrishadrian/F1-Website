const resultsRepository = require('../repository/resultsRepository')
const standingsRepository = require('../repository/standingsRepository')

async function getResultsBySeason(req, res) {
	const selectedSeason = req.params.season;
	try {
		const getResults = await resultsRepository.getResultsBySeason(selectedSeason);
		res.json({ result: getResults });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getResultsByTrackAndSeason(req, res) {
	const trackParam = req.params.track
	const selectedTrack = trackParam.charAt(0).toUpperCase() + trackParam.slice(1)
	const selectedSeason = req.params.season;
	try {
		const getResults = await resultsRepository.getResultsByTrackAndSeason(selectedTrack, selectedSeason);
		res.json({ result: getResults });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}


async function insertResult(req, res) {
	const { grandPrix, position, name, laps, time, year } = req.body;
	try {
		const raceID = await resultsRepository.getRaceIDByTrack(grandPrix)
		const seasonID = await resultsRepository.getSeasonIDByYear(year)
		const rank = await resultsRepository.getPrevRaceRankByDriverName(name, raceID, position)
		const insertResult = await resultsRepository.insertResult(raceID, position, name, laps, time, seasonID, raceID, rank);
		if (insertResult === 1) {
			const points = getResultPointsByPosition(position);
			const insertedStanding = await standingsRepository.insertDriversStanding(seasonID, raceID, rank, name, raceID, position, points)
			res.json({ result: `Successfully inserted ${insertResult} result and ${insertedStanding} standing` });
			return;
		}
		res.status(500).json({ result: 'Failed to insert result'});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function updateDriverName(req, res) {
	const { oldDriverName, newDriverName } = req.body;
	try {
		const updateResult = await resultsRepository.updateDriverName(oldDriverName, newDriverName);
		res.json({ result: updateResult ? 'Success' : 'Fail' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function deleteResultByKeys(req, res) {
	const { grandPrix, position } = req.body;
	try {
		const raceID = await resultsRepository.getRaceIDByTrack(grandPrix)
		const deleteResult = await resultsRepository.deleteResultByKeys(raceID, position);
		res.json({ result: `Successfully deleted ${deleteResult} result(s)` });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getMaxAvgLapTime(req, res) {
    const getResult = await resultsRepository.getMaxAvgLapTime();
    if (getResult) {
        res.json({ result: getResult});
    } else {
        res.status(500).json({ result: 'Failed to get max average laptime'});
    }
}

function getResultPointsByPosition(position) {
	switch (parseInt(position)) {
		case 1: return 25
		case 2: return 18
		case 3: return 15
		case 4: return 12
		case 5: return 10
		case 6: return 8
		case 7: return 6
		case 8: return 4
		case 9: return 2
		case 10: return 1
		default: return 0
	}
}

module.exports = {
	getResultsBySeason,
	getResultsByTrackAndSeason,
	insertResult,
	updateDriverName,
	deleteResultByKeys,
	getMaxAvgLapTime
};