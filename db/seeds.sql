USE business;

INSERT INTO departments (name)
VALUES
 ("Sales"),
 ("Engineering"),
 ("Finance"),
 ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1), 
("Lead Engineer", 150000, 2), 
("Software Engineer", 120000, 2), 
("Accountant", 125000, 3), 
("Legal Team Lead", 250000, 4), 
("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES 
("John", "Doe", 1), 
("Mike", "Chan", 1), 
("Ashley", "Rodriguez", 2),
("Kevin", "Tupik", 2), 
("Kunal", "Singh", 3), 
("Malia", "Brown", 3), 
("Sarah", "Lourd", 4), 
("Tom", "Allen", 4);
