/* table that containts all quizzes*/
CREATE TABLE IF NOT EXISTS Topic (
	`TopicTitle` varchar(20) NOT NULL, 
	`DescriptionLink` varchar(20) NOT NULL,
	`LinkName` varchar(20) NOT NULL,
    CONSTRAINT PK_TopicTitle PRIMARY KEY (TopicTitle)
);

/* inserting data into Topic table*/
INSERT INTO Topic (TopicTitle, DescriptionLink, LinkName) VALUES('Internet', 'page3-internet-explorer.html', 'information about internet');
INSERT INTO Topic (TopicTitle, DescriptionLink, LinkName) VALUES('Mozilla', 'page2-mozilla-firefox.html', 'information about mozilla');


CREATE TABLE IF NOT EXISTS Quiz (
	`QuizID` varchar(6) NOT NULL, 
	`QuizTitle` varchar(20) NOT NULL,
    CONSTRAINT PK_QuizID PRIMARY KEY (QuizID)
);

/* inserting data into Quiz table*/
INSERT INTO Quiz (QuizID, QuizTitle) VALUES('P1DQ01', 'Quiz 1');
INSERT INTO Quiz (QuizID, QuizTitle) VALUES('P1DQ02', 'Quiz 2');
INSERT INTO Quiz (QuizID, QuizTitle) VALUES('P1DQ03', 'Quiz 3');
INSERT INTO Quiz (QuizID, QuizTitle) VALUES('P1DQ04', 'Quiz 4');

/*table that contains all the questions of the assesment system */
CREATE TABLE IF NOT EXISTS Question (
	`QuizID` varchar(6) NOT NULL,
    `QuestionTitle` varchar(15) NOT NULL,
	`CorrectAnswer` varchar(30) NOT NULL,
	`ProblemStatement` varchar(25) NOT NULL,
	`FeedbackIncorrect` varchar(25) NOT NULL,
	`FeedbackCorrect` varchar(25) NOT NULL,
	CONSTRAINT PK_Question PRIMARY KEY (QuizID, QuestionTitle),
    CONSTRAINT FK_QuizID FOREIGN KEY (QuizID ) REFERENCES Question(QuizID)
);

/* inserting data into question tables*/

/* Quiz 1 */
INSERT INTO Question VALUES('P1DQ01', 'Question 1', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ01', 'Question 2', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ01', 'Question 3', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
INSERT INTO Question VALUES('P1DQ01', 'Question 4', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');

/* Quiz 2 */
-- INSERT INTO Question VALUES('P1DQ02', 'Question 1', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
-- INSERT INTO Question VALUES('P1DQ02', 'Question 2', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
-- INSERT INTO Question VALUES('P1DQ02', 'Question 3', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
-- INSERT INTO Question VALUES('P1DQ02', 'Question 4', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');

-- /* Quiz 3 */
-- INSERT INTO Question VALUES('P1DQ03', 'Question 1', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
-- INSERT INTO Question VALUES('P1DQ03', 'Question 2', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
-- INSERT INTO Question VALUES('P1DQ03', 'Question 3', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
-- INSERT INTO Question VALUES('P1DQ03', 'Question 4', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');

-- /* Quiz 4 */
-- INSERT INTO Question VALUES('P1DQ04', 'Question 1', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
-- INSERT INTO Question VALUES('P1DQ04', 'Question 2', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
-- INSERT INTO Question VALUES('P1DQ04', 'Question 3', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');
-- INSERT INTO Question VALUES('P1DQ04', 'Question 4', 'Good Answer', 'Problem Statement', 'Incorrect, the good answer is this ..', 'This is the correct answer');

/*table with all the user*/
CREATE TABLE IF NOT EXISTS User (
	`UserName` varchar(20) DEFAULT NULL, 
	`FirstName` varchar(20) DEFAULT NULL, 
	`LastName` varchar(20) DEFAULT NULL,
	`Password` varchar(20) DEFAULT NULL,
	'UserAttempts' INT DEFAULT NULL,  
	'CorrectAttempt' INT DEFAULT NULL,  
    CONSTRAINT PK_UserName PRIMARY KEY (UserName)
);

/*dummy user*/
INSERT INTO User VALUES('ultra', 'Tom', 'Boer', 'hoi123', '20', '5');



