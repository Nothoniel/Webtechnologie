/* table that containts all quizzes*/
CREATE TABLE IF NOT EXISTS Topic (
	`TopicTitle` varchar(20) NOT NULL, 
	`DescriptionLink` varchar(20) NOT NULL,
	`LinkName` varchar(20) NOT NULL,
    CONSTRAINT PK_TopicTitle PRIMARY KEY (TopicTitle)
);

/* inserting data into Topic table*/
INSERT INTO Topic (TopicTitle, DescriptionLink, LinkName) VALUES('GoogleChrome', 'page1-google-chrome.html', 'Information about the correspondig theory!');
INSERT INTO Topic (TopicTitle, DescriptionLink, LinkName) VALUES('MozillaFireFox', 'page2-mozilla-firefox.html', 'Information about the correspondig theory!');


CREATE TABLE IF NOT EXISTS Quiz (
	`QuizID` varchar(6) NOT NULL, 
	`QuizTitle` varchar(20) NOT NULL,
    CONSTRAINT PK_QuizID PRIMARY KEY (QuizID)
);

/* inserting data into Quiz table*/
INSERT INTO Quiz (QuizID, QuizTitle) VALUES('P1DQ01', 'GoogleChrome1');
INSERT INTO Quiz (QuizID, QuizTitle) VALUES('P1DQ02', 'GoogleChrome2');
INSERT INTO Quiz (QuizID, QuizTitle) VALUES('P1DQ03', 'MozillaFireFox1');
INSERT INTO Quiz (QuizID, QuizTitle) VALUES('P1DQ04', 'FireFox2');

/*table that contains all the questions of the assesment system */
CREATE TABLE IF NOT EXISTS Question (
	`QuizID` varchar(6) NOT NULL,
	`QuestionID` varchar(6) NOT NULL,
	'Type' varchar(20) NOT NULL,
    `QuestionTitle` varchar(15) NOT NULL,
	`CorrectAnswer` varchar(30) NOT NULL,
	`ProblemStatement` varchar(25) NOT NULL,
	`FeedbackIncorrect` varchar(25) NOT NULL,
	`FeedbackCorrect` varchar(25) NOT NULL,
	CONSTRAINT PK_Question PRIMARY KEY (QuestionID),
    CONSTRAINT FK_QuizID FOREIGN KEY (QuizID ) REFERENCES Quiz(QuizID)
);

/* inserting data into question tables*/

/* Quiz 1 */
INSERT INTO Question VALUES('P1DQ01','Q1DQ01', 'multipleChoice', 'Question1', 'Good Answer', 'What year was Google Chrome first publicly on Windows?', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ01','Q1DQ02', 'open', 'Question2', 'Good Answer', 'What is the Color of the middle circle of the Google Chrome Logo?', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ01','Q1DQ03', 'multiChoice', 'Question3', 'Good Answer', 'Which of the are the obstacles encountered by a user playing the dinosaurgame?', 'Incorrect, the good answer is this ..', 'This is the correct answer');

/* Quiz 2 */
INSERT INTO Question VALUES('P1DQ01','Q1DQ04','open', 'Question1', 'Good Answer', 'What species of dinosaurs is controlled by the user when playing the dinosaurgame?', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ02','Q1DQ05','multipleChoice', 'Question2', 'Good Answer', 'Which mode can be activated to for example make your browser unable to permanently store search history?', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ02','Q1DQ06', 'multipleChoice', 'Question3', 'Good Answer', 'On which distribution of linux is Chrome OS based?', 'Incorrect, the good answer is this ..', 'This is the correct answer');

-- /* Quiz 3 */
INSERT INTO Question VALUES('P1DQ03', 'Q1DQ07','multipleChoice', 'Question1', 'Good Answer', 'What year was Firefox 1.0 released?', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ03', 'Q1DQ08', 'multiChoice', 'Question2', 'Good Answer', 'What programming language(s) did the application layer of FireFox OS consist of?', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ03', 'Q1DQ09', 'open', 'Question3', 'Good Answer', 'What was the name of the layout-enginge used in FireFox OS?', 'Incorrect, the good answer is this ..', 'This is the correct answer');

-- /* Quiz 4 */
INSERT INTO Question VALUES('P1DQ04', 'Q1DQ10','multiChoice', 'Question1', 'Good Answer', 'Using which of the following 3 layers was FireFox Os built?', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ04', 'Q1DQ11', 'open', 'Question2', 'Good Answer', 'What was the original name of Firefox?', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ04', 'Q1DQ12', 'ordering', 'Question3', 'Good Answer', 'What are the top 4 leading web browsers in order of popularity on desktop as of January 2021?', 'Incorrect, the good answer is this ..', 'This is the correct answer');

/* table that contains the multichoice values for a question */
CREATE TABLE IF NOT EXISTS Multichoice (
	`QuestionID` varchar(6) NOT NULL,
	`MultichoiceValue` varchar(40) NOT NULL,
    CONSTRAINT FK_QuizID FOREIGN KEY (QuestionID ) REFERENCES Question(QuestionID)
);

--Question 1
INSERT INTO Multichoice VALUES('Q1DQ01','2008');
INSERT INTO Multichoice VALUES('Q1DQ01','2005');
INSERT INTO Multichoice VALUES('Q1DQ01','2006');
INSERT INTO Multichoice VALUES('Q1DQ01','2007');
INSERT INTO Multichoice VALUES('Q1DQ01','2009');

--Question 3
INSERT INTO Multichoice VALUES('Q1DQ03','cacti');
INSERT INTO Multichoice VALUES('Q1DQ03','pterodactyls');
INSERT INTO Multichoice VALUES('Q1DQ03','bats');
INSERT INTO Multichoice VALUES('Q1DQ03','birds');
INSERT INTO Multichoice VALUES('Q1DQ03','fences');
INSERT INTO Multichoice VALUES('Q1DQ03','spikes');

--Question 5
INSERT INTO Multichoice VALUES('Q1DQ05','incognity mode');
INSERT INTO Multichoice VALUES('Q1DQ05','stealth mode');
INSERT INTO Multichoice VALUES('Q1DQ05','dark mode');
INSERT INTO Multichoice VALUES('Q1DQ05','invisible mode');
INSERT INTO Multichoice VALUES('Q1DQ05','VPNmode');
INSERT INTO Multichoice VALUES('Q1DQ05','privacy mode');

--Question 6
INSERT INTO Multichoice VALUES('Q1DQ06','Gentoo');
INSERT INTO Multichoice VALUES('Q1DQ06','Gecko');
INSERT INTO Multichoice VALUES('Q1DQ06','Manjaro');
INSERT INTO Multichoice VALUES('Q1DQ06','KDE');
INSERT INTO Multichoice VALUES('Q1DQ06','Ubuntu');
INSERT INTO Multichoice VALUES('Q1DQ06','Fedora');
INSERT INTO Multichoice VALUES('Q1DQ06','Peppermint'); 

--Question 7
INSERT INTO Multichoice VALUES('Q1DQ07','2004');
INSERT INTO Multichoice VALUES('Q1DQ07','2003');
INSERT INTO Multichoice VALUES('Q1DQ07','2002');
INSERT INTO Multichoice VALUES('Q1DQ07','2001');

--Question 8
INSERT INTO Multichoice VALUES('Q1DQ08','HTML5');
INSERT INTO Multichoice VALUES('Q1DQ08','JavaScript');
INSERT INTO Multichoice VALUES('Q1DQ08','CSS');
INSERT INTO Multichoice VALUES('Q1DQ08','Jade/pug');
INSERT INTO Multichoice VALUES('Q1DQ08','XML');
INSERT INTO Multichoice VALUES('Q1DQ08','JSON');

--Question 10
INSERT INTO Multichoice VALUES('Q1DQ10','applicationlayer');
INSERT INTO Multichoice VALUES('Q1DQ10','Open Web Platform Interface');
INSERT INTO Multichoice VALUES('Q1DQ10','infrastructurelayer');
INSERT INTO Multichoice VALUES('Q1DQ10','Closed Web Platform Interface');
INSERT INTO Multichoice VALUES('Q1DQ10','datalayer');
INSERT INTO Multichoice VALUES('Q1DQ10','networklayer');
INSERT INTO Multichoice VALUES('Q1DQ10','connectionlayer');

--Question 12
INSERT INTO Multichoice VALUES('Q1DQ12','Google Chrome');
INSERT INTO Multichoice VALUES('Q1DQ12','Safari');
INSERT INTO Multichoice VALUES('Q1DQ12','Mozilla Firefox');
INSERT INTO Multichoice VALUES('Q1DQ12','Microsoft Edge');

/*table with all the users*/
CREATE TABLE IF NOT EXISTS User (
	`UserName` varchar(20) UNIQUE, 
	`FirstName` varchar(20), 
	`LastName` varchar(20),
	`Password` varchar(20),
	'UserAttempts' INT DEFAULT 0,  
	'CorrectAttempt' INT DEFAULT 0,  
    CONSTRAINT PK_UserName PRIMARY KEY (UserName)
);





