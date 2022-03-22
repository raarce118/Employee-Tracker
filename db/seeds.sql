INSERT INTO employees (id, first_name, last_name, roles_id, manager_id)
VALUES
(1, 'John', 'Doe', '1', '1'),
(2, 'Mike', 'Chan', '2', '2'),
(3, 'Ashley', 'Rodriguez', '3', '3'),
(4, 'Kevin', 'Tupik', '4', '4'),
(5,'Kunal', 'Singh', '5', '5'),
(6, 'Malia', 'Brown','1', '1'),
(7, 'Sarah', 'Lourd','2', '2'),
(8, 'Tom', 'Allen', '5', '5');

INSERT INTO department(department_name, roles_id)
VALUES
('sales', 1),
('engineering', 2),
('finance', 3),
('legal', 4);

INSERT INTO roles(title, salary, department_id)
VALUES
('sales lead', '100000', 1),
('sales person','80000', 1),
('lead engineer', '150000', 2),
('software engineer', '120000', 2),
('account manager', '160000', 3),
('accountant', '1250000', 3),
('legal team lead', '250000', 4),
('lawyer', '190000', 4);