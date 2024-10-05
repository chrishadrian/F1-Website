-- drop table queries
DROP TABLE Seasons CASCADE CONSTRAINTS;
DROP TABLE Constructors CASCADE CONSTRAINTS;
DROP TABLE Partners CASCADE CONSTRAINTS;
DROP TABLE Races CASCADE CONSTRAINTS;
DROP TABLE Drivers_WorksFor_Participate CASCADE CONSTRAINTS;
DROP TABLE At_Tracks CASCADE CONSTRAINTS;
DROP TABLE Driver_Rank_Standings_Withholds CASCADE CONSTRAINTS;
DROP TABLE Constructor_Rank_Standings_Withholds CASCADE CONSTRAINTS;
DROP TABLE Practice CASCADE CONSTRAINTS;
DROP TABLE Qualifying CASCADE CONSTRAINTS;
DROP TABLE StartingGrid CASCADE CONSTRAINTS;
DROP TABLE GrandPrix_Results CASCADE CONSTRAINTS;
DROP TABLE Sponsors CASCADE CONSTRAINTS;

-- create table queries
CREATE TABLE Seasons (
    SeasonID INT,
    Year INT,
    PRIMARY KEY (SeasonID)
);

CREATE TABLE Constructors (
    Name VARCHAR(50),
    TeamPrincipal VARCHAR(50),
    Championships INT,
    UNIQUE (TeamPrincipal),
    PRIMARY KEY (Name)
);

CREATE TABLE Partners (
    Name VARCHAR(50),
    Type VARCHAR(50),
    StartDate DATE,
    PRIMARY KEY (Name)
);

CREATE TABLE Races (
    RaceID INT,
    RaceDate DATE,
    PRIMARY KEY (RaceID)
);

CREATE TABLE Drivers_WorksFor_Participate (
    DName VARCHAR(50),
    Podiums INT NOT NULL,
    Wins INT NOT NULL,
    Championships INT NOT NULL,
    CName VARCHAR(50) NOT NULL,
    RaceID INT NOT NULL,
    PRIMARY KEY (RaceID, DName),
    FOREIGN KEY (CName) REFERENCES Constructors(Name) ON DELETE CASCADE,
    FOREIGN KEY (RaceID) REFERENCES Races(RaceID) ON DELETE CASCADE
);

CREATE TABLE At_Tracks (
    TracksID INT,
    City VARCHAR(50),
    RaceDate DATE,
    LapDistance INT,
    RaceID INT NOT NULL,
    PRIMARY KEY (TracksID),
    FOREIGN KEY (RaceID) REFERENCES Races(RaceID) ON DELETE CASCADE
);

CREATE TABLE Practice (
    RaceID INT,
    DriverName VARCHAR(50),
    LapTimes VARCHAR(20),
    SessionID INT,
    PRIMARY KEY (RaceID, DriverName),
    FOREIGN KEY (RaceID) REFERENCES Races(RaceID) ON DELETE CASCADE
);

CREATE TABLE Qualifying (
    RaceID INT,
    SessionID INT,
    DriverName VARCHAR(50) NOT NULL,
    LapTimes VARCHAR(20) NOT NULL,
    PRIMARY KEY (RaceID, DriverName),
    FOREIGN KEY (RaceID) REFERENCES Races(RaceID) ON DELETE CASCADE
);

CREATE TABLE StartingGrid (
    DriverName VARCHAR(50),
    StartingPosition INT NOT NULL,
    RaceID INT NOT NULL,
    LapTimes VARCHAR(20) NOT NULL,
    PRIMARY KEY (RaceID, DriverName),
    FOREIGN KEY (RaceID) REFERENCES Races(RaceID) ON DELETE CASCADE
);

CREATE TABLE GrandPrix_Results (
    RaceID INT NOT NULL,
    DriverPosition INT,
    DriverName VARCHAR(50),
    NumberOfLaps INT NOT NULL,
    RaceTime VARCHAR(20),
    SeasonID INT NOT NULL,
    StandingID INT NOT NULL,
    Rank INT NOT NULL,
    UNIQUE (SeasonID, StandingID, Rank, DriverName),
    PRIMARY KEY (StandingID, SeasonID, RaceID, DriverPosition),
	FOREIGN KEY (RaceID) REFERENCES Races(RaceID) ON DELETE CASCADE,
    FOREIGN KEY (SeasonID) REFERENCES Seasons(SeasonID) ON DELETE CASCADE

);

CREATE TABLE Driver_Rank_Standings_Withholds (
    SeasonID INT,
    StandingID INT,
    Rank INT,
    DriverName VARCHAR(50),
    RaceID INT NOT NULL,
    DriverPosition INT NOT NULL,
    DriverPoints INT NOT NULL,
    PRIMARY KEY (SeasonID, StandingID, Rank),
	FOREIGN KEY (StandingID, SeasonID, RaceID, DriverPosition) REFERENCES GrandPrix_Results (StandingID, SeasonID, RaceID, DriverPosition) ON DELETE CASCADE,
    FOREIGN KEY (RaceID) REFERENCES Races(RaceID) ON DELETE CASCADE
);

CREATE TABLE Constructor_Rank_Standings_Withholds (
    SeasonID INT,
    StandingID INT,
    Rank INT,
    Constructor VARCHAR(50),
    RaceID INT NOT NULL,
    ConstructorPosition INT NOT NULL,
    ConstructorPoints INT NOT NULL,
    UNIQUE (SeasonID, RaceID, ConstructorPosition),
    PRIMARY KEY (SeasonID, StandingID, Rank),
    FOREIGN KEY (SeasonID) REFERENCES Seasons(SeasonID) ON DELETE CASCADE,
    FOREIGN KEY (RaceID) REFERENCES Races(RaceID) ON DELETE CASCADE
);

CREATE TABLE Sponsors (
    PName VARCHAR(50),
    CName VARCHAR(50),
    PRIMARY KEY (PName, CName),
    FOREIGN KEY (PName) REFERENCES Partners(Name),
    FOREIGN KEY (CName) REFERENCES Constructors(Name)
);

-- insert queries

INSERT INTO Seasons (SeasonID, Year)
SELECT 1, 2023 FROM DUAL
UNION ALL SELECT 2, 2022 FROM DUAL
UNION ALL SELECT 3, 2021 FROM DUAL
UNION ALL SELECT 4, 2020 FROM DUAL
UNION ALL SELECT 5, 2019 FROM DUAL;

INSERT INTO Constructors (Name, TeamPrincipal, Championships)
SELECT 'Mercedes-AMG Petronas F1 Team', 'Toto Wolff', 9 FROM DUAL
UNION ALL SELECT 'Red Bull Racing', 'Christian Horner', 6 FROM DUAL
UNION ALL SELECT 'Scuderia Ferrari', 'Mattia Binotto', 16 FROM DUAL
UNION ALL SELECT 'McLaren F1 Team', 'Zak Brown', 8 FROM DUAL
UNION ALL SELECT 'Scuderia AlphaTauri', 'Laurent Mekies', 0 FROM DUAL;

INSERT INTO Partners (Name, Type, StartDate)
SELECT 'SponsorA', 'Title Sponsor', TO_DATE('2022-01-01', 'YYYY-MM-DD') FROM DUAL
UNION ALL SELECT 'SponsorB', 'Official Partner', TO_DATE('2021-03-15', 'YYYY-MM-DD') FROM DUAL
UNION ALL SELECT 'SponsorC', 'Technical Partner', TO_DATE('2022-05-20', 'YYYY-MM-DD') FROM DUAL
UNION ALL SELECT 'SponsorD', 'Official Supplier', TO_DATE('2020-12-10', 'YYYY-MM-DD') FROM DUAL
UNION ALL SELECT 'SponsorE', 'Official Sponsor', TO_DATE('2021-08-05', 'YYYY-MM-DD') FROM DUAL;

INSERT INTO Races (RaceID, RaceDate)
SELECT 1, TO_DATE('2023-03-31', 'YYYY-MM-DD') FROM DUAL
UNION ALL SELECT 2, TO_DATE('2023-04-02', 'YYYY-MM-DD') FROM DUAL
UNION ALL SELECT 3, TO_DATE('2023-06-16', 'YYYY-MM-DD') FROM DUAL
UNION ALL SELECT 4, TO_DATE('2023-06-17', 'YYYY-MM-DD') FROM DUAL
UNION ALL SELECT 5, TO_DATE('2023-08-20', 'YYYY-MM-DD') FROM DUAL;

INSERT INTO Drivers_WorksFor_Participate (RaceID, DName, Podiums, Wins, Championships, CName)
-- start of raceid = 1
SELECT 1, 'Lewis Hamilton', 197, 103, 7, 'Mercedes-AMG Petronas F1 Team'FROM DUAL
UNION ALL SELECT 1, 'Max Verstappen', 98, 54, 3, 'Red Bull Racing'FROM DUAL
UNION ALL SELECT 1, 'Charles Leclerc', 30, 5, 0, 'Scuderia Ferrari'FROM DUAL
UNION ALL SELECT 1, 'Daniel Ricciardo', 32, 8, 0, 'Scuderia AlphaTauri'FROM DUAL
UNION ALL SELECT 1, 'Lando Norris', 7, 0, 0, 'McLaren F1 Team'FROM DUAL
-- 2nd set of drivers for constructors
UNION ALL SELECT 1, 'George Russell', 1, 1, 0, 'Mercedes-AMG Petronas F1 Team'FROM DUAL
UNION ALL SELECT 1, 'Sergio Perez', 9, 2, 0, 'Red Bull Racing' FROM DUAL
UNION ALL SELECT 1, 'Carlos Sainz', 2, 1, 0, 'Scuderia Ferrari'FROM DUAL
UNION ALL SELECT 1, 'Pierre Gasly', 2, 1, 0, 'Scuderia AlphaTauri'FROM DUAL
UNION ALL SELECT 1, 'Oscar Piastri', 1, 0, 0, 'McLaren F1 Team'FROM DUAL
-- -- start of raceid = 2
UNION ALL SELECT 2, 'Lewis Hamilton', 198, 104, 8, 'Mercedes-AMG Petronas F1 Team'FROM DUAL
UNION ALL SELECT 2, 'Max Verstappen', 99, 54, 3, 'Red Bull Racing'FROM DUAL
UNION ALL SELECT 2, 'Charles Leclerc', 31, 5, 0, 'Scuderia Ferrari' FROM DUAL
UNION ALL SELECT 2, 'Daniel Ricciardo', 32, 8, 0, 'Scuderia AlphaTauri' FROM DUAL
UNION ALL SELECT 2, 'Lando Norris', 7, 0, 0, 'McLaren F1 Team'FROM DUAL
-- 2nd set of drivers for constructors
UNION ALL SELECT 2, 'George Russell', 1, 1, 0, 'Mercedes-AMG Petronas F1 Team' FROM DUAL
UNION ALL SELECT 2, 'Sergio Perez', 9, 2, 0, 'Red Bull Racing'FROM DUAL
UNION ALL SELECT 2, 'Carlos Sainz', 2, 1, 0, 'Scuderia Ferrari' FROM DUAL
UNION ALL SELECT 2, 'Pierre Gasly', 2, 1, 0, 'Scuderia AlphaTauri' FROM DUAL
UNION ALL SELECT 2, 'Oscar Piastri', 1, 0, 0, 'McLaren F1 Team' FROM DUAL;

INSERT INTO At_Tracks (TracksID, City, RaceDate, LapDistance, RaceID)
SELECT 1, 'Melbourne', TO_DATE('2019-03-31', 'YYYY-MM-DD'), 58, 1 FROM DUAL
UNION ALL SELECT 2, 'Montreal', TO_DATE('2020-04-02', 'YYYY-MM-DD'), 70, 2 FROM DUAL
UNION ALL SELECT 3, 'Austin', TO_DATE('2021-06-16', 'YYYY-MM-DD'), 56, 3 FROM DUAL
UNION ALL SELECT 4, 'Singapore', TO_DATE('2022-06-17', 'YYYY-MM-DD'), 62, 4 FROM DUAL
UNION ALL SELECT 5, 'Barcelona', TO_DATE('2023-08-20', 'YYYY-MM-DD'), 66, 5 FROM DUAL;

INSERT INTO GrandPrix_Results (RaceID, DriverPosition, DriverName, NumberOfLaps, RaceTime, SeasonID, StandingID, Rank)
SELECT 1, 1, 'Lewis Hamilton', 53, '1:11:56.136', 1, 1, 1 FROM DUAL
UNION ALL SELECT 1, 2, 'Max Verstappen', 53, '1:12:02.736', 1, 1, 2 FROM DUAL
UNION ALL SELECT 1, 3, 'Charles Leclerc', 53, '1:12:56.310', 1, 1, 3 FROM DUAL
UNION ALL SELECT 1, 4, 'Daniel Ricciardo', 53, '1:13:32.436', 1, 1, 4 FROM DUAL
UNION ALL SELECT 1, 5, 'Lando Norris', 53, '1:14:34.126', 1, 1, 5 FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 1, 6, 'George Russell', 53, '1:15:32.436', 1, 1, 6 FROM DUAL
UNION ALL SELECT 1, 7, 'Sergio Perez', 53, '1:15:42.555', 1, 1, 7 FROM DUAL
UNION ALL SELECT 1, 8, 'Carlos Sainz', 53, '1:15:44.111', 1, 1, 8 FROM DUAL
UNION ALL SELECT 1, 9, 'Pierre Gasly', 53, '1:15:45.001', 1, 1, 9 FROM DUAL
UNION ALL SELECT 1, 10, 'Oscar Piastri', 53, '1:15:46.101', 1, 1, 10 FROM DUAL
-- raceid = 2
UNION ALL SELECT 2, 1, 'Lewis Hamilton', 70, '1:04:56.226', 1, 2, 1 FROM DUAL
UNION ALL SELECT 2, 2, 'Max Verstappen', 70, '1:15:11.123', 1, 2, 2 FROM DUAL
UNION ALL SELECT 2, 3, 'Charles Leclerc', 70, '1:15:56.111', 1, 2, 3 FROM DUAL
UNION ALL SELECT 2, 4, 'Daniel Ricciardo', 70, '1:16:22.125', 1, 2, 4 FROM DUAL
UNION ALL SELECT 2, 5, 'Lando Norris', 70, '1:16:56.136', 1, 2, 5 FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 2, 6, 'George Russell', 70, '1:17:36.126', 1, 2, 6 FROM DUAL
UNION ALL SELECT 2, 7, 'Sergio Perez', 70, '1:17:15.032', 1, 2, 7 FROM DUAL
UNION ALL SELECT 2, 8, 'Carlos Sainz', 70, '1:18:23.123', 1, 2, 8 FROM DUAL
UNION ALL SELECT 2, 9, 'Pierre Gasly', 70, '1:19:11.321', 1, 2, 9 FROM DUAL
UNION ALL SELECT 2, 10, 'Oscar Piastri', 70, '1:20:56.045', 1, 2, 10 FROM DUAL
-- seasonid = 2
UNION ALL SELECT 1, 1, 'Lewis Hamilton', 53, '1:11:56.136', 2, 1, 1 FROM DUAL
UNION ALL SELECT 1, 2, 'Max Verstappen', 53, '1:12:02.736', 2, 1, 2 FROM DUAL
UNION ALL SELECT 1, 3, 'Charles Leclerc', 53, '1:12:56.310', 2, 1, 3 FROM DUAL
UNION ALL SELECT 1, 4, 'Daniel Ricciardo', 53, '1:13:32.436', 2, 1, 4 FROM DUAL
UNION ALL SELECT 1, 5, 'Lando Norris', 53, '1:14:34.126', 2, 1, 5 FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 1, 6, 'George Russell', 53, '1:15:32.436', 2, 1, 6 FROM DUAL
UNION ALL SELECT 1, 7, 'Sergio Perez', 53, '1:15:42.555', 2, 1, 7 FROM DUAL
UNION ALL SELECT 1, 8, 'Carlos Sainz', 53, '1:15:44.111', 2, 1, 8 FROM DUAL
UNION ALL SELECT 1, 9, 'Pierre Gasly', 53, '1:15:45.001', 2, 1, 9 FROM DUAL
UNION ALL SELECT 1, 10, 'Oscar Piastri', 53, '1:15:46.101', 2, 1, 10 FROM DUAL;

INSERT INTO Driver_Rank_Standings_Withholds (SeasonID, StandingID, Rank, DriverName, RaceID, DriverPosition, DriverPoints)
SELECT 1, 1, 1, 'Lewis Hamilton', 1, 1, 25 FROM DUAL
UNION ALL SELECT 1, 1, 2, 'Max Verstappen', 1, 2, 18 FROM DUAL
UNION ALL SELECT 1, 1, 3, 'Charles Leclerc', 1, 3, 15 FROM DUAL
UNION ALL SELECT 1, 1, 4, 'Daniel Ricciardo', 1, 4, 12 FROM DUAL
UNION ALL SELECT 1, 1, 5, 'Lando Norris', 1, 5, 10 FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 1, 1, 6,'George Russell', 1, 6, 8 FROM DUAL
UNION ALL SELECT 1, 1, 7, 'Sergio Perez', 1, 7, 6 FROM DUAL
UNION ALL SELECT 1, 1, 8, 'Carlos Sainz',  1, 8, 4 FROM DUAL
UNION ALL SELECT 1, 1, 9, 'Pierre Gasly', 1, 9, 2 FROM DUAL
UNION ALL SELECT 1, 1, 10, 'Oscar Piastri', 1, 10, 1 FROM DUAL
-- raceid = 2
UNION ALL SELECT 1, 2, 1, 'Lewis Hamilton', 2, 1, 50 FROM DUAL
UNION ALL SELECT 1, 2, 2, 'Max Verstappen', 2, 2, 36 FROM DUAL
UNION ALL SELECT 1, 2, 3, 'Charles Leclerc', 2, 3, 30 FROM DUAL
UNION ALL SELECT 1, 2, 4, 'Daniel Ricciardo', 2, 4, 24 FROM DUAL
UNION ALL SELECT 1, 2, 5, 'Lando Norris', 2, 5, 20 FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 1, 2, 6,'George Russell', 2, 6, 16 FROM DUAL
UNION ALL SELECT 1, 2, 7, 'Sergio Perez', 2, 7, 12 FROM DUAL
UNION ALL SELECT 1, 2, 8, 'Carlos Sainz',  2, 8, 8 FROM DUAL
UNION ALL SELECT 1, 2, 9, 'Pierre Gasly', 2, 9, 4 FROM DUAL
UNION ALL SELECT 1, 2, 10, 'Oscar Piastri', 2, 10, 2 FROM DUAL
-- seasonid = 2
UNION ALL SELECT 2, 1, 1, 'Lewis Hamilton', 1, 1, 25 FROM DUAL
UNION ALL SELECT 2, 1, 2, 'Max Verstappen', 1, 2, 18 FROM DUAL
UNION ALL SELECT 2, 1, 3, 'Charles Leclerc', 1, 3, 15 FROM DUAL
UNION ALL SELECT 2, 1, 4, 'Daniel Ricciardo', 1, 4, 12 FROM DUAL
UNION ALL SELECT 2, 1, 5, 'Lando Norris', 1, 5, 10 FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 2, 1, 6,'George Russell', 1, 6, 8 FROM DUAL
UNION ALL SELECT 2, 1, 7, 'Sergio Perez', 1, 7, 6 FROM DUAL
UNION ALL SELECT 2, 1, 8, 'Carlos Sainz',  1, 8, 4 FROM DUAL
UNION ALL SELECT 2, 1, 9, 'Pierre Gasly', 1, 9, 2 FROM DUAL
UNION ALL SELECT 2, 1, 10, 'Oscar Piastri', 1, 10, 1 FROM DUAL;

INSERT INTO Constructor_Rank_Standings_Withholds (SeasonID, StandingID, Rank, Constructor, RaceID, ConstructorPosition, ConstructorPoints)
SELECT 1, 1, 1, 'Mercedes-AMG Petronas F1 Team', 1, 1, 33 FROM DUAL
UNION ALL SELECT 1, 1, 2, 'Red Bull Racing', 1, 2, 24 FROM DUAL
UNION ALL SELECT 1, 1, 3, 'Scuderia Ferrari', 1, 3, 19 FROM DUAL
UNION ALL SELECT 1, 1, 4, 'Scuderia AlphaTauri', 1, 4, 14 FROM DUAL
UNION ALL SELECT 1, 1, 5, 'McLaren F1 Team', 1, 5, 11  FROM DUAL
-- standingID=2
UNION ALL SELECT 1, 2, 1, 'Mercedes-AMG Petronas F1 Team', 2, 1, 66 FROM DUAL
UNION ALL SELECT 1, 2, 2, 'Red Bull Racing', 2, 2, 48 FROM DUAL
UNION ALL SELECT 1, 2, 3, 'Scuderia Ferrari', 2, 3, 38 FROM DUAL
UNION ALL SELECT 1, 2, 4, 'Scuderia AlphaTauri', 2, 4, 28 FROM DUAL
UNION ALL SELECT 1, 2, 5, 'McLaren F1 Team', 2, 5, 22  FROM DUAL
-- shows that mercedes constructor position is both 1 in seasonid = 1 and 2
UNION ALL SELECT 2, 1, 1, 'Mercedes-AMG Petronas F1 Team', 1, 1, 33 FROM DUAL
UNION ALL SELECT 2, 1, 2, 'Red Bull Racing', 1, 2, 24 FROM DUAL
UNION ALL SELECT 2, 1, 3, 'Scuderia Ferrari', 1, 3, 19 FROM DUAL
UNION ALL SELECT 2, 1, 4, 'Scuderia AlphaTauri', 1, 4, 14 FROM DUAL
UNION ALL SELECT 2, 1, 5, 'McLaren F1 Team', 1, 5, 11 FROM DUAL;

INSERT INTO Practice (RaceID, SessionID, DriverName, LapTimes)
SELECT 1, 1, 'Lewis Hamilton', '00:01:05' FROM DUAL
UNION ALL SELECT 1, 1, 'Max Verstappen', '00:01:06' FROM DUAL
UNION ALL SELECT 1, 1, 'Charles Leclerc', '00:01:15' FROM DUAL
UNION ALL SELECT 1, 1, 'Daniel Ricciardo', '00:01:32' FROM DUAL
UNION ALL SELECT 1, 1, 'Lando Norris', '00:01:55' FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 1, 1, 'George Russell', '00:02:08' FROM DUAL
UNION ALL SELECT 1, 1, 'Sergio Perez', '00:02:10' FROM DUAL
UNION ALL SELECT 1, 1, 'Carlos Sainz', '00:02:13' FROM DUAL
UNION ALL SELECT 1, 1, 'Pierre Gasly', '00:02:21' FROM DUAL
UNION ALL SELECT 1, 1, 'Oscar Piastri', '00:03:10' FROM DUAL
-- raceid = 2
UNION ALL SELECT 2, 1, 'Lewis Hamilton', '00:01:01' FROM DUAL
UNION ALL SELECT 2, 1, 'Max Verstappen', '00:01:09' FROM DUAL
UNION ALL SELECT 2, 1, 'Charles Leclerc', '00:01:30' FROM DUAL
UNION ALL SELECT 2, 1, 'Daniel Ricciardo', '00:01:31' FROM DUAL
UNION ALL SELECT 2, 1, 'Lando Norris', '00:01:32' FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 2, 1, 'George Russell', '00:01:33' FROM DUAL
UNION ALL SELECT 2, 1, 'Sergio Perez', '00:02:01' FROM DUAL
UNION ALL SELECT 2, 1, 'Carlos Sainz', '00:02:02' FROM DUAL
UNION ALL SELECT 2, 1, 'Pierre Gasly', '00:02:03' FROM DUAL
UNION ALL SELECT 2, 1, 'Oscar Piastri', '00:02:04' FROM DUAL;

INSERT INTO Qualifying (RaceID, SessionID, DriverName, LapTimes)
SELECT 1, 1, 'Lewis Hamilton', '00:01:08' FROM DUAL
UNION ALL SELECT 1, 1, 'Max Verstappen', '00:01:18' FROM DUAL
UNION ALL SELECT 1, 1, 'Charles Leclerc', '00:01:48' FROM DUAL
UNION ALL SELECT 1, 1, 'Daniel Ricciardo', '00:01:38' FROM DUAL
UNION ALL SELECT 1, 1, 'Lando Norris', '00:01:58' FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 1, 1, 'George Russell', '00:01:08' FROM DUAL
UNION ALL SELECT 1, 1, 'Sergio Perez', '00:01:15' FROM DUAL
UNION ALL SELECT 1, 1, 'Carlos Sainz', '00:01:31' FROM DUAL
UNION ALL SELECT 1, 1, 'Pierre Gasly', '00:01:40' FROM DUAL
UNION ALL SELECT 1, 1, 'Oscar Piastri', '00:01:39' FROM DUAL
-- raceid = 2
UNION ALL SELECT 2, 1, 'Lewis Hamilton', '00:01:01' FROM DUAL
UNION ALL SELECT 2, 1, 'Max Verstappen', '00:01:08' FROM DUAL
UNION ALL SELECT 2, 1, 'Charles Leclerc', '00:01:28' FROM DUAL
UNION ALL SELECT 2, 1, 'Daniel Ricciardo', '00:01:38' FROM DUAL
UNION ALL SELECT 2, 1, 'Lando Norris', '00:01:58' FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 2, 1, 'George Russell', '00:02:08' FROM DUAL
UNION ALL SELECT 2, 1, 'Sergio Perez', '00:02:11' FROM DUAL
UNION ALL SELECT 2, 1, 'Carlos Sainz', '00:02:35' FROM DUAL
UNION ALL SELECT 2, 1, 'Pierre Gasly', '00:02:38' FROM DUAL
UNION ALL SELECT 2, 1, 'Oscar Piastri', '00:02:39' FROM DUAL;

INSERT INTO StartingGrid (RaceID, DriverName, StartingPosition, LapTimes)
SELECT 1, 'Lewis Hamilton', 1, '00:01:00' FROM DUAL
UNION ALL SELECT 1, 'Max Verstappen', 2, '00:01:04' FROM DUAL
UNION ALL SELECT 1, 'Charles Leclerc', 3, '00:01:08' FROM DUAL
UNION ALL SELECT 1, 'Daniel Ricciardo', 4, '00:01:31' FROM DUAL
UNION ALL SELECT 1, 'Lando Norris', 5, '00:01:31' FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 1, 'George Russell', 6, '00:01:41' FROM DUAL
UNION ALL SELECT 1, 'Sergio Perez', 7, '00:01:45' FROM DUAL
UNION ALL SELECT 1, 'Carlos Sainz', 8, '00:01:48' FROM DUAL
UNION ALL SELECT 1, 'Pierre Gasly', 9, '00:01:49' FROM DUAL
UNION ALL SELECT 1, 'Oscar Piastri', 10, '00:01:50' FROM DUAL
-- -- race id = 2
UNION ALL SELECT 2, 'Lewis Hamilton', 1, '00:01:01' FROM DUAL
UNION ALL SELECT 2, 'Max Verstappen', 2, '00:01:09' FROM DUAL
UNION ALL SELECT 2, 'Charles Leclerc', 3, '00:01:11' FROM DUAL
UNION ALL SELECT 2, 'Daniel Ricciardo', 4, '00:01:21' FROM DUAL
UNION ALL SELECT 2, 'Lando Norris', 5, '00:01:41' FROM DUAL
-- 2nd set of drivers
UNION ALL SELECT 2, 'George Russell', 6, '00:01:51' FROM DUAL
UNION ALL SELECT 2, 'Sergio Perez', 7, '00:02:45' FROM DUAL
UNION ALL SELECT 2, 'Carlos Sainz', 8, '00:02:48' FROM DUAL
UNION ALL SELECT 2, 'Pierre Gasly', 9, '00:02:49' FROM DUAL
UNION ALL SELECT 2, 'Oscar Piastri', 10, '00:03:01' FROM DUAL;

INSERT INTO Sponsors (PName, CName)
SELECT 'SponsorA', 'Mercedes-AMG Petronas F1 Team' FROM DUAL
UNION ALL SELECT 'SponsorB', 'Red Bull Racing' FROM DUAL
UNION ALL SELECT 'SponsorC', 'Scuderia Ferrari' FROM DUAL
UNION ALL SELECT 'SponsorD', 'Scuderia AlphaTauri' FROM DUAL
UNION ALL SELECT 'SponsorE', 'McLaren F1 Team' FROM DUAL;