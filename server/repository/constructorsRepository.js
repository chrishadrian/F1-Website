const appService = require("./../appService")


// display constructors information based on user selected consturctor
async function getConstructorsBySeason(selectedSeason) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT DISTINCT C.Name, C.TeamPrincipal, C.Championships
			FROM CONSTRUCTORS C
			JOIN CONSTRUCTOR_RANK_STANDINGS_WITHHOLDS CRSW ON C.NAME=CRSW.CONSTRUCTOR
			JOIN SEASONS S ON CRSW.SEASONID=S.SEASONID AND S.YEAR=:selectedSeason`,
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


// search for a constructor that has X or more race wins
async function getConstructorXRaceWins(numWin) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT CName, SUM(Wins) AS TotalWins
             FROM Drivers_WorksFor_Participate
             GROUP BY CName
             HAVING SUM(Wins) >= :minTotalWins`,
			[numWin],
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


// calculates the number of races a constructor has raced in (count of all the races its drivers has raced in)
async function totalConstructorRaces() {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT DISTINCT dw.CName AS name, COUNT(dw.RaceID) AS total_races
			FROM Drivers_WorksFor_Participate dw
			GROUP BY dw.CName`
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


// search for the Constructors who have placed Xth every season
async function getConstructorsThatPlacedXthEverySeason(selectedRank) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT UNIQUE c.Name, s.YEAR
			FROM Constructors c
			JOIN CONSTRUCTOR_RANK_STANDINGS_WITHHOLDS crsw ON c.name=crsw.CONSTRUCTOR
			JOIN SEASONS s ON crsw.SEASONID = s.SEASONID
			WHERE EXISTS (
				SELECT SeasonID
				FROM Seasons
				WHERE EXISTS (
					SELECT *
					FROM Constructor_Rank_Standings_Withholds crsw
					WHERE Seasons.SeasonID = crsw.SeasonID
					  AND c.Name = crsw.Constructor
					  AND crsw.Rank =: rank))`,
			[selectedRank],
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

// update Constructors team principal and number of championships
async function updateTeamPrincipalAndChips(newTeamPrincipal, newChampionships, name) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`UPDATE Constructors
             SET TeamPrincipal =: newTeamPrincipal,
                 Championships =: newChampionships
             WHERE Name =: name`,
			[newTeamPrincipal, newChampionships, name],
			{ autoCommit: true }
		);

		return result.rowsAffected && result.rowsAffected > 0;
	}).catch((error) => {
		throw new Error(error);
	});
}


module.exports = {
	getConstructorsBySeason,
	getConstructorXRaceWins,
	totalConstructorRaces,
	getConstructorsThatPlacedXthEverySeason,
	updateTeamPrincipalAndChips
};
