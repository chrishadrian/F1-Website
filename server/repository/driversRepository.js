const appService = require("./../appService")


// display drivers information, no user input
async function getDriversBySeason(selectedSeason) {
	return await appService.withOracleDB(async (connection) => {
		const result = await connection.execute(
			`SELECT dwfp.RACEID, dwfp.DName AS name, dwfp.CName AS team, dwfp.PODIUMS, dwfp.Wins, dwfp.Championships
			FROM Drivers_WorksFor_Participate dwfp
				JOIN GRANDPRIX_RESULTS GR on dwfp.RACEID=GR.RACEID AND dwfp.DNAME=GR.DRIVERNAME
				JOIN SEASONS S ON GR.SEASONID=S.SEASONID AND S.YEAR=:selectedSeason
			WHERE GR.RACEID = (SELECT MAX(RACEID) FROM Drivers_WorksFor_Participate)`,
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
	}).catch(() => {
		return false;
	});
}

module.exports = {
	getDriversBySeason
};