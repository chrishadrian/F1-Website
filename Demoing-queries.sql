/*
to include:
- sanitization : Values from the user are not directly used in the database. Basic security practices to prevent injection and rainbow attacks have been followed.
- error handling
- user friendliness: designed for someone with no knowledge of CS
- user notification: The user will receive a success or failure notification upon the completion of an insert, update, delete action and will have a way to verify the action's effect on the database.
 */

-- Results page: insert results - implemented
INSERT INTO Results(RaceID, DriverPosition, DriverName, SeasonID, StandingID, Rank)
VALUES(:RaceID, :DriverPosition, :DriverName, :SeasonID, :StandingID, :Rank)



-- Constructors page: update Constructors team principal and number of championships - implemented
UPDATE Constructors
SET TeamPrincipal =: newTeamPrincipal,
    Championships =: newChampionships
WHERE Name =: name;



-- Results page: delete results - implemented
DELETE FROM Results WHERE RaceID=:raceID AND DriverPosition=:pos



-- selection and where - implemented
-- Standings page: selecting to display constructors standings
-- user has to provide the value in the where clause
SELECT crsw.Rank, crsw.Constructor, crsw.ConstructorPoints AS Points
		FROM Constructor_Rank_Standings_Withholds crsw
			JOIN Seasons s ON crsw.SeasonID = s.SeasonID AND s.Year = :selectedSeason
		WHERE crsw.STANDINGID = :selectedStandingID



--  Projection, must contain at least 4 attributes - not implemented yet
--  The application must dynamically load the tables from the database
-- The user is able to choose any number of attributes to view from any relation in the database.
-- Non-selected attributes must not appear in the result.
SELECT



-- join - implemented
-- displays gp, date, drivername, consturctor, laps, race time bsaed on user selected season and track
-- user has to provide the value in the where clause
SELECT r.RACEID, t.CITY as GP, t.RACEDATE, r.DRIVERNAME as Winner, dwp.CNAME, r.NUMBEROFLAPS, r.RACETIME FROM GRANDPRIX_RESULTS r
JOIN Seasons s ON r.SeasonID = s.SeasonID AND s.Year = :selectedSeason
JOIN AT_TRACKS T on r.RACEID = T.RACEID
JOIN DRIVERS_WORKSFOR_PARTICIPA2TE DWP on r.RACEID = DWP.RACEID AND r.DRIVERNAME = DWP.DNAME
WHERE t.CITY = :selectedTrack



-- aggregation with group by - implemented
-- calculates the number of races a constructor has raced in (count of all the races its drivers has raced in)
-- for this, maybe can create a button which the user can press to execute this
SELECT DISTINCT dw.CName AS Constructor_Name,
                COUNT(dw.RaceID) AS Total_Races
FROM Drivers_WorksFor_Participate dw
GROUP BY dw.CName;



-- aggregation with having - implemented
-- user wants to search for a constructor that has X or more race wins
-- for this, maybe can create a textbox which the user can input a number
SELECT CName, SUM(Wins) AS TotalWins
FROM Drivers_WorksFor_Participate
GROUP BY CName
HAVING SUM(Wins) >= :minTotalWins;



-- Nested Aggregation with GROUP BY - implemented
-- returns the max avg lap times of all drivers in qualifying
SELECT MAX(AvgLapTimeInSeconds) AS Max_Average_LapTime
FROM (
        SELECT AVG(TO_NUMBER(SUBSTR(LapTimes, 1, 2)) * 60 +
                    TO_NUMBER(SUBSTR(LapTimes, 4, 2)) +
                    TO_NUMBER(SUBSTR(LapTimes, 7, 2))) AS AvgLapTimeInSeconds
        FROM Qualifying
        GROUP BY RaceID, DriverName
);



-- division - implemented
-- search for the Constructors who placed Xth every season
-- (e.g. user inputs 1, that means we will find the constructor that has been 1st in every season
-- if user inputs 2, we will find constructor that has been 2nd in every season)
-- for this, maybe can create a textbox which the user can input a number
SELECT c.Name
FROM Constructors c
WHERE EXISTS (
    SELECT SeasonID
    FROM Seasons
    WHERE EXISTS (
        SELECT *
        FROM Constructor_Rank_Standings_Withholds crsw
        WHERE Seasons.SeasonID = crsw.SeasonID
          AND c.Name = crsw.Constructor
          AND crsw.Rank =: rank))