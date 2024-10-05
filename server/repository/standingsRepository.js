const appService = require("./../appService")

// display overall driver standings for a particular season
async function getDriversStandingByKeys(selectedSeason, selectedStandingID) {
	const query = `
		SELECT drsw.Rank, drsw.DRIVERNAME as DRIVER, dwfp.CNAME as CAR, drsw.DRIVERPOINTS AS Points
		FROM Driver_Rank_Standings_Withholds drsw
			JOIN Seasons s ON drsw.SeasonID = s.SeasonID AND s.Year = :selectedSeason
			JOIN Drivers_WorksFor_Participate dwfp
			ON drsw.RaceID = dwfp.RaceID AND drsw.DRIVERNAME = dwfp.DNAME
		WHERE drsw.STANDINGID = :selectedStandingID
	`;

	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			query,
			[selectedSeason, selectedStandingID],
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
	}).catch(() => {
		return false;
	});
}

async function getLastStandingIDBySeason(selectedSeason) {
	const query = `
		SELECT max(STANDINGID) FROM Driver_Rank_Standings_Withholds drsw
		JOIN Seasons s ON drsw.SeasonID = s.SeasonID AND s.Year = :selectedSeason
	`;

	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			query,
			[selectedSeason],
			{ autoCommit: true }
		);

		return result.rows[0][0];
	}).catch(() => {
		return false;
	});
}


// display overall constructor standings for a particular season
async function getConstructorsStandingByKeys(selectedSeason, selectedStandingID) {
	const query = `
		SELECT crsw.Rank, crsw.Constructor, crsw.ConstructorPoints AS Points
		FROM Constructor_Rank_Standings_Withholds crsw
			JOIN Seasons s ON crsw.SeasonID = s.SeasonID AND s.Year = :selectedSeason
		WHERE crsw.STANDINGID = :selectedStandingID
	`;

	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			query,
			[selectedSeason, selectedStandingID],
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
	}).catch(() => {
		return false;
	});
}

async function insertDriversStanding(seasonID, standingID, rank, driverName, raceID, driverPosition, driverPoints) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`INSERT INTO DRIVER_RANK_STANDINGS_WITHHOLDS (SEASONID, STANDINGID, RANK, DRIVERNAME, RACEID, DRIVERPOSITION, DRIVERPOINTS)
			VALUES (:seasonID, :standingID, :rank, :driverName, :raceID, :driverPosition, :driverPoints)`,
			[seasonID, standingID, rank, driverName, raceID, driverPosition, driverPoints],
			{ autoCommit: true }
		);

		return result.rowsAffected;
	}).catch((error) => {
		throw new Error(error);
	});
}

// no need to implement this
// async function insertConstructorsStanding(seasonID, standingID, rank, constructor, raceID, constructorPosition, constructorPoints) {
// 	return await appService.withOracleDB(async (connection) => {
// 		const result = await connection.execute(
// 			`INSERT INTO CONSTRUCTOR_RANK_STANDINGS_WITHHOLDS (SEASONID, STANDINGID, RANK, CONSTRUCTOR, RACEID, CONSTRUCTORPOSITION, CONSTRUCTORPOINTS)
// 			VALUES (:seasonID, :standingID, :rank, :constructor, :raceID, :constructorPosition, :constructorPoints);`,
// 			[seasonID, standingID, rank, constructor, raceID, constructorPosition, constructorPoints],
// 			{ autoCommit: true }
// 		);

// 		return result.rowsAffected;
// 	}).catch((error) => {
// 		throw new Error(error);
// 	});
// }

module.exports = {
	getDriversStandingByKeys,
	getConstructorsStandingByKeys,
	getLastStandingIDBySeason,
	insertDriversStanding
}