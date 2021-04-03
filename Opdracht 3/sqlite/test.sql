/* Higher level entities*/
--///////////////////////
CREATE TABLE IF NOT EXISTS Game(
	`GameID` varchar(8) NOT NULL,
	`DSID` varchar(8) NOT NULL,
	`PublisherID` varchar(8) NOT NULL,
	`SubfranchiseName` varchar(30) NOT NULL,
	`SystemID` varchar(8) NOT NULL,
	`Title` char(25) NOT NULL,
	`Genre` char(15) NOT NULL,
	CONSTRAINT PK_GameID PRIMARY KEY (GameID),
	CONSTRAINT FK_DSID FOREIGN KEY (DSID) REFERENCES DevelopmentStudio(DSID),
	CONSTRAINT FK_PublisherID FOREIGN KEY (PublisherID) REFERENCES Publisher (PublisherID),
	CONSTRAINT FK_SubFranchise FOREIGN KEY (SubfranchiseName) REFERENCES SubFranchise (SubfranchiseName),
	CONSTRAINT FK_SystemID FOREIGN KEY (SystemID) REFERENCES System(SystemID),
	CONSTRAINT FK_GameID FOREIGN KEY (GameID) REFERENCES RegionVersion(GameID)
);

CREATE TABLE IF NOT EXISTS System (
	`SystemID` varchar(8) NOT NULL, 
	`Name` varchar(20) NOT NULL, 
	`ConsoleLineID` varchar(8) NOT NULL,
	`ReleaseDate` datetime NOT NULL,
	`Bitsize` tinyint NOT NULL,
	CONSTRAINT PK_SystemID PRIMARY KEY (SystemID),
	CONSTRAINT FK_ConsoleLineID FOREIGN KEY (ConsoleLineID) REFERENCES ConsoleLine(ConsoleLineID)
);

CREATE TABLE IF NOT EXISTS DevelopmentStudio (
	`DSID` varchar(8) NOT NULL, 
	`Name` varchar(30) NOT NULL,
	`Location` char(30) NOT NULL,
	`Phone` char(10) NOT NULL,
	CONSTRAINT PK_DSID PRIMARY KEY (DSID)
);

CREATE TABLE IF NOT EXISTS Publisher (
	`PublisherID` varchar(8) NOT NULL, 
	`Name` varchar(30) NOT NULL,
	`Location` char(30) NOT NULL,
	`Phone` char(10) NOT NULL,
	CONSTRAINT PK_PublisherID PRIMARY KEY(PublisherID)
);

CREATE TABLE IF NOT EXISTS SubFranchise (
	`SubfranchiseName` varchar(30) NOT NULL,
	`FranchiseName` varchar(30) NOT NULL,
	`Release` datetime NOT NULL,
	CONSTRAINT PK_Subfranchise PRIMARY KEY(SubfranchiseName),
	CONSTRAINT FK_Franchise FOREIGN KEY (FranchiseName) REFERENCES GameFranchise(FranchiseName) 	
);

CREATE TABLE IF NOT EXISTS RegionVersion (
	`GameID` varchar(8) NOT NULL,
	`RegionName` char(10) NOT NULL,
	`Release` datetime NOT NULL,
	CONSTRAINT PK_GameID PRIMARY KEY(GameID)
);

/* Lower level entities*/
--//////////////////////
CREATE TABLE IF NOT EXISTS ConsoleLine (
	`ConsoleLineID` varchar(8) NOT NULL, 
	`Name` varchar(20) NOT NULL, /* can’t be NULL */
	`ReleaseDate` datetime NOT NULL,
	`Bitsize` tinyint NOT NULL,
	CONSTRAINT PK_ConsoleLineID PRIMARY KEY(ConsoleLineID)
);

/* supertype of isa-hierarchy */
/* uses a composite primary key, since foreign keys of the child tables are also composite keys */
/* TEXT CHECK is used similarly to ENUM datatype */
CREATE TABLE IF NOT EXISTS Worker (
	`UserID` varchar(8) NOT NULL,
    `DSID` varchar(8) NOT NULL, 
    `Function` TEXT CHECK(Function IN ('president','director','designer')) NOT NULL,
	`FirstName` char(15) NOT NULL,
	`LastName` char(15) NOT NULL,
	`Street` char(15) NOT NULL,
	`Phone` char(10) NOT NULL,
	`DateOfBirth` datetime NOT NULL,
    CONSTRAINT PK_UserID PRIMARY KEY (UserID, Function),
	CONSTRAINT FK_DSID FOREIGN KEY (DSID) REFERENCES DevelopmentStudio(DSID)
);

/* subtype of of isa-hierarchy */
/* experience is the amount of years worked at a studio*/
CREATE TABLE IF NOT EXISTS DevelopmentDirector (
	`UserID` varchar(8) NOT NULL,
    `Function` TEXT CHECK(Function IN ('director')) NOT NULL,
	`Experience` tinyint NOT NULL, 
	CONSTRAINT PK_UserID PRIMARY KEY (UserID),
	CONSTRAINT FK_Job FOREIGN KEY (UserID, Function) REFERENCES Worker(UserID, Function)
);

/* subtype of of isa-hierarchy */
/* experience is the amount of years worked at a studio*/
CREATE TABLE IF NOT EXISTS GameDesigner (
	`UserID` varchar(8) NOT NULL,
    `Function` TEXT CHECK(Function IN ('designer')) NOT NULL,
	`Experience` tinyint NOT NULL,
	CONSTRAINT PK_UserID PRIMARY KEY (UserID),
	CONSTRAINT FK_Job FOREIGN KEY (UserID, Function) REFERENCES Worker(UserID, Function)
);

/* subtype of of isa-hierarchy */
CREATE TABLE IF NOT EXISTS President (
	`UserID` varchar(8) NOT NULL,
    `Function` TEXT CHECK(Function IN ('president')) NOT NULL,
	`TimeframeOfPresidency` varchar(10) NOT NULL,
	CONSTRAINT PK_UserID PRIMARY KEY (UserID),
	CONSTRAINT FK_Job FOREIGN KEY (UserID, Function) REFERENCES Worker(UserID, Function)
);

CREATE TABLE IF NOT EXISTS GameFranchise (
	`FranchiseName` varchar(30) NOT NULL,
	`Release` datetime NOT NULL,	
	CONSTRAINT PK_GameFranchise PRIMARY KEY(FranchiseName)
);


