-- Create the database
CREATE DATABASE IF NOT EXISTS skillswap;

-- Use the database
USE skillswap;

-- Create users table
-- NOTE: Changed IDENTITY(1,1) to AUTO_INCREMENT and NVARCHAR to VARCHAR
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);