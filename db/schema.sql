DROP DATABASE IF EXISTS boss;

CREATE DATABASE boss;

USE boss;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    roles_id INT NULL,
    manager_id INT NULL,
    INT PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    roles_id INT,
    department_name VARCHAR(30) NULL,
    INT PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL NULL,
    department_id INT NULL,
    INT PRIMARY KEY (id)
);
