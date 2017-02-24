
CREATE DATABASE baby_boom


CREATE TABLE achievement_data ( -- the achievements the child has completed.
	id SERIAL PRIMARY KEY,
	userid INT, --or userID?
	achievement_id INT, -- so that it doesn't always show - using a JOIN.
  achievement_completed_text TEXT,
  achievement_completed_date DATE,
  achievement_completed_comment TEXT
);


CREATE TABLE achievements (
	id SERIAL PRIMARY KEY,
  achievement_age_months REAL, -- REAL is a pretty good number which has decimals.  needs decimals to compare to for month calculations.
	achievement_text TEXT, -- the basic info about the achievement
  achievement_placeholder TEXT --prompts the user to describe the experience
);


CREATE TABLE pictures (
	id SERIAL PRIMARY KEY,
	userid INT, -- equals picture owner
	picture_url TEXT,
	picture_comment TEXT,
	picture_originalname TEXT
);

CREATE TABLE user_contacts (
	id SERIAL PRIMARY KEY,
	userid INT,
	contactname TEXT,
  contactemail TEXT
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username varchar(80) NOT NULL UNIQUE,
	password varchar(256) NOT NULL,
	user_fullname VARCHAR (100)
	user_baby_name VARCHAR (80),
	user_baby_birthday DATE
);



CREATE TABLE email_history (
	id SERIAL PRIMARY KEY,
	userid INT,






);
