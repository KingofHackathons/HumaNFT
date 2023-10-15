-- Create User table

CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    WalletAddress CHAR(42) NOT NULL,
    UserName VARCHAR(255) UNIQUE,
    Email VARCHAR(255) UNIQUE,
    SignUpDate DATE
);
	
-- Create Project table

CREATE TABLE Project (
    ProjectID INT AUTO_INCREMENT PRIMARY KEY,
    Name TEXT NOT NULL,
    ContractAddress CHAR(42) NOT NULL,
    OwnerID INT,
    FOREIGN KEY (OwnerID) REFERENCES User(UserID)
);


-- Create Questions table
CREATE TABLE Questions (
    QuestionID INT AUTO_INCREMENT PRIMARY KEY,
    Question TEXT,
    QuestionType TEXT -- Indicates if it is for Characters or Projects
);
CREATE INDEX idx_questiontype ON Questions(QuestionType);



-- Create ProjectData table
CREATE TABLE ProjectData (
    AnswerID INT AUTO_INCREMENT PRIMARY KEY,
    QuestionID INT,
    ProjectID INT,
    Answer TEXT,
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID),
    FOREIGN KEY (QuestionID) REFERENCES Questions(QuestionID)
);

-- Create ProjectCharacters table
CREATE TABLE ProjectCharacters (
    CharacterID INT AUTO_INCREMENT PRIMARY KEY,
    TokenID INT,
    ProjectID INT,
    UserID INT,
    CharacterName TEXT NOT NULL,
    CharacterDescription TEXT,
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Create CharacterData table
CREATE TABLE CharacterData (
    AnswerID INT AUTO_INCREMENT PRIMARY KEY,
    CharacterID INT,
    QuestionID INT,
    Answer TEXT NOT NULL,
    FOREIGN KEY (CharacterID) REFERENCES ProjectCharacters(CharacterID)
);


