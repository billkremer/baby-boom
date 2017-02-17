
CREATE DATABASE baby_boom


CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username varchar(80) NOT NULL UNIQUE,
	password varchar(256) NOT NULL,
	user_fullname VARCHAR (100)
	user_baby_name VARCHAR (80),
	user_baby_birthday DATE -- timestamp?
);


CREATE TABLE achievements (
	id SERIAL PRIMARY KEY,
	achievement_text TEXT,
  achievement_age_months REAL, -- number or text? // REAL is a pretty good number which has decimals.  needs decimals to compare to.
  achievement_placeholder TEXT
);


-- CREATE TABLE achievement_data (
-- 	id SERIAL PRIMARY KEY,
-- 	username varchar(80), --or userID?
-- 	achievement_id INT, -- so that it doesn't show - using a JOIN.
--   achievement_completed TEXT,
--   achievement_completed_date DATE, --? timestamp?
--   achievement_completed_comment TEXT
-- );

CREATE TABLE achievement_data (
	id SERIAL PRIMARY KEY,
	userid INT, --or userID?
	achievement_id INT, -- so that it doesn't show - using a JOIN.
  achievement_completed_text TEXT,
  achievement_completed_date DATE, --? timestamp?
  achievement_completed_comment TEXT
);



CREATE TABLE user_contacts (
	id SERIAL PRIMARY KEY,
	userid INT,
	contactName TEXT,
  contactEmail TEXT
);


-- CREATE TABLE email_history (
-- 	id SERIAL PRIMARY KEY,
--
-- );


CREATE TABLE pictures (
	id SERIAL PRIMARY KEY,
	userid INT, -- equals picture owner
	picture_url TEXT
);
