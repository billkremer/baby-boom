CREATE DATABASE passport

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username varchar(80) NOT NULL UNIQUE,
	password varchar(256) NOT NULL
);
