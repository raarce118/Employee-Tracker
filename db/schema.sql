DROP DATABASE IF EXISTS boss;

CREATE DATABASE boss;

USE boss;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    roles_id INT NULL,
     manager_id INTEGER,
     CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
     CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
    
);

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    roles_id INT,
    department_name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
);
