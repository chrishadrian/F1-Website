const appService = require("./../appService")

async function getResultsBySeason(selectedSeason) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT r.RACEID, t.CITY as GP, t.RACEDATE, r.DRIVERNAME as Winner, dwp.CNAME, r.NUMBEROFLAPS, r.RACETIME 
			FROM GRANDPRIX_RESULTS r
			JOIN Seasons s ON r.SeasonID = s.SeasonID AND s.Year = :selectedSeason
			JOIN AT_TRACKS T on r.RACEID = T.RACEID
			JOIN DRIVERS_WORKSFOR_PARTICIPATE DWP on r.RACEID = DWP.RACEID AND r.DRIVERNAME = DWP.DNAME
			WHERE DRIVERPOSITION = 1`,
			[selectedSeason],
			{ autoCommit: true }
		);

		const resultJSON = result.rows.map((row) => {
			const rowObject = {};
			result.metaData.forEach((column, index) => {
				const columnName = column.name.toLowerCase();
				rowObject[columnName] = row[index];
			});
			return rowObject;
		});

		return resultJSON
	}).catch((error) => {
		throw new Error(error);
	});
}

async function getResultsByTrackAndSeason(selectedTrack, selectedSeason) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT r.RACEID, r.DRIVERPOSITION as Pos, r.DRIVERNAME as Driver, dwp.CNAME as Car, r.NUMBEROFLAPS, r.RACETIME 
			FROM GRANDPRIX_RESULTS r
			JOIN Seasons s ON r.SeasonID = s.SeasonID AND s.Year = :selectedSeason
			JOIN AT_TRACKS T on r.RACEID = T.RACEID
			JOIN DRIVERS_WORKSFOR_PARTICIPATE DWP on r.RACEID = DWP.RACEID AND r.DRIVERNAME = DWP.DNAME
			WHERE t.CITY = :selectedTrack`,
			[selectedSeason, selectedTrack],
			{ autoCommit: true }
		);

		const resultJSON = result.rows.map((row) => {
			const rowObject = {};
			result.metaData.forEach((column, index) => {
				const columnName = column.name.toLowerCase();
				rowObject[columnName] = row[index];
			});
			return rowObject;
		});

		return resultJSON
	}).catch((error) => {
		throw new Error(error);
	});
}

async function getRaceIDByTrack(selectedTrack) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT RACEID FROM AT_TRACKS WHERE CITY=:selectedTrack`,
			[selectedTrack],
			{ autoCommit: true }
		);
		return result.rows[0][0];
	}).catch((error) => {
		throw new Error(error);
	});
}

async function getSeasonIDByYear(selectedYear) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT SEASONID FROM SEASONS WHERE YEAR=:selectedYear`,
			[selectedYear],
			{ autoCommit: true }
		);

		return result.rows[0][0];
	}).catch((error) => {
		throw new Error(error);
	});
}

async function getPrevRaceRankByDriverName(driverName, raceID, driverPosition) {
	if (raceID === 1) {
		return driverPosition;
	}

	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT RANK FROM DRIVER_RANK_STANDINGS_WITHHOLDS WHERE DRIVERNAME=:driverName AND RACEID=:raceID-1`,
			[driverName, raceID],
			{ autoCommit: true }
		);

		return result.rows[0][0];
	}).catch((error) => {
		throw new Error(error);
	});
}

async function insertResult(raceID, driverPosition, driverName, numberOfLaps, raceTime, seasonID, standingID, rank) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`INSERT INTO GrandPrix_Results(RACEID, DRIVERPOSITION, DRIVERNAME, NUMBEROFLAPS, RACETIME, SEASONID, STANDINGID, RANK)
            VALUES(:raceID, :driverPosition, :driverName, :numberOfLaps, :raceTime, :seasonID, :standingID, :rank)`,
			[raceID, driverPosition, driverName, numberOfLaps, raceTime, seasonID, standingID, rank],
			{ autoCommit: true }
		);

		return result.rowsAffected;
	}).catch((error) => {
		throw new Error(error);
	});
}

async function updateDriverName(oldDriverName, newDriverName) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`UPDATE GrandPrix_Results SET DriverName = :newDriverName WHERE DriverName = :oldDriverName`,
			[newDriverName, oldDriverName],
			{ autoCommit: true }
		);

		return result.rowsAffected && result.rowsAffected > 0;
	}).catch((error) => {
		throw new Error(error);
	});
}

async function deleteResultByKeys(raceID, position) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`DELETE FROM GrandPrix_Results WHERE raceID=:raceID AND driverPosition=:position`,
			[raceID, position],
			{ autoCommit: true }
		);

		return result.rowsAffected;
	}).catch(() => {
		throw new Error(error);
	});
}

// returns the max avg lap times of all drivers in qualifying
async function getMaxAvgLapTime() {
	return await appService.withOracleDB(async (connection) => {
		const query = `
			SELECT MAX(AvgLapTimeInSeconds) AS Max_Average_LapTime
			FROM (
				SELECT AVG(TO_NUMBER(SUBSTR(LapTimes, 0, 2)) * 60 + 
							TO_NUMBER(SUBSTR(LapTimes, 4, 2)) + 
							TO_NUMBER(SUBSTR(LapTimes, 7, 2)))
					AS AvgLapTimeInSeconds
			FROM Qualifying
			GROUP BY RaceID, DriverName)
		`;
		const result = await connection.execute(query);

		const resultJSON = result.rows.map((row) => {
			const rowObject = {};
			result.metaData.forEach((column, index) => {
				const columnName = column.name.toLowerCase();
				rowObject[columnName] = row[index];
			});
			return rowObject;
		});

		return resultJSON
	}).catch((error) => {
		throw new Error(error);
	});
}


// // display results for a particular season/year and race/track e.g. season:2023, race:Monaco
// async function displayParticularRaceResultsForDrivers(selectedSeason, selectedRace){
// 	const query = `SELECT track.City, track.RaceDate, drsw.DriverPosition, drsw.DriverName, track.LapDistance
// 					FROM Driver_Rank_Standings_Withholds drsw
// 					LEFT JOIN At_Tracks track ON drsw.RaceID = track.RaceID
// 					WHERE drsw.SeasonID =:selectedSeason AND track.city =:selectedRace
// 					ORDER BY track.City ASC`;
//
// 	return await appService.withOracleDB(async (connection) => {
// 		const result = await connection.execute(
// 			query,
// 			[selectedSeason, selectedRace],
// 			{ autoCommit: true }
// 		);
//
// 		return result.rowsAffected && result.rowsAffected > 0;
// 	}).catch(() => {
// 		return false;
// 	});
// }


module.exports = {
	getResultsBySeason,
	getResultsByTrackAndSeason,
	getRaceIDByTrack,
	getSeasonIDByYear,
	getPrevRaceRankByDriverName,
	insertResult,
	updateDriverName,
	deleteResultByKeys,
	getMaxAvgLapTime
};