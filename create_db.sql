# Create the database
CREATE DATABASE IF NOT EXISTS health;
USE health;

# Create the tables

CREATE TABLE IF NOT EXISTS users (
    id               INT AUTO_INCREMENT,
    username         VARCHAR(255) NOT NULL UNIQUE,
    first            VARCHAR(255) NOT NULL,
    last             VARCHAR(255) NOT NULL,
    email            VARCHAR(255) NOT NULL UNIQUE,  
    hashedPassword   VARCHAR(255) NOT NULL,
    PRIMARY KEY(id));

CREATE TABLE IF NOT EXISTS appointments (
    id               INT AUTO_INCREMENT,
    name             VARCHAR(255) NOT NULL,
    appDate          DATETIME NOT NULL,
    appTime          DATETIME NOT NULL,
    appInfo          TEXT
    PRIMARY KEY(id));
    

CREATE USER IF NOT EXISTS 'health_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON health.* TO ' health_app'@'localhost';