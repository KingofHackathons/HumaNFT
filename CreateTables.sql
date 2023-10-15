-- Create Project table
CREATE TABLE Project (
ProjectID INT AUTO_INCREMENT PRIMARY KEY,
Name TEXT NOT NULL,
ContractAddress CHAR(42) NOT NULL
);

-- Create ProjectScenarios table
CREATE TABLE ProjectScenarios (
ScenarioID INT AUTO_INCREMENT PRIMARY KEY,
ProjectID INT,
Name TEXT NOT NULL,
Description TEXT,
Prompt TEXT,
BackgroundImage TEXT,
FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

-- Create ProjectLore table
CREATE TABLE ProjectLore (
LoreID INT AUTO_INCREMENT PRIMARY KEY,
ProjectID INT,
DocumentName TEXT NOT NULL,
DocumentPath TEXT,
UploadDate DATE,
FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

-- Create User table
CREATE TABLE User (
UserID INT AUTO_INCREMENT PRIMARY KEY,
WalletAddress CHAR(42) NOT NULL,
UserName TEXT,
Email TEXT,
SignUpDate DATE
);

-- Create ProjectCharacters table
CREATE TABLE ProjectCharacters (
CharacterID INT AUTO_INCREMENT PRIMARY KEY,
ProjectID INT,
UserID INT,
CharacterName TEXT NOT NULL,
CharacterDescription TEXT,
FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID),
FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Create CharacterDialog table
CREATE TABLE CharacterDialog (
DialogID INT AUTO_INCREMENT PRIMARY KEY,
CharacterID INT,
DialogQuestion TEXT,
DialogAnswer TEXT,
FOREIGN KEY (CharacterID) REFERENCES ProjectCharacters(CharacterID)
);

-- Create CharacterQuestions table
CREATE TABLE CharacterQuestions (
QuestionID INT AUTO_INCREMENT PRIMARY KEY,
Question TEXT NOT NULL
);

-- Create CharacterAnswers table
CREATE TABLE CharacterAnswers (
AnswerID INT AUTO_INCREMENT PRIMARY KEY,
CharacterID INT,
QuestionID INT,
Answer TEXT NOT NULL,
FOREIGN KEY (CharacterID) REFERENCES ProjectCharacters(CharacterID),
FOREIGN KEY (QuestionID) REFERENCES CharacterQuestions(QuestionID)
);