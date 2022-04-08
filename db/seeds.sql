INSERT INTO department
(name) 
VALUES 
("Executives"),
("Accounting"),
("I.T."),
("H.R."),
("Sales");

INSERT INTO roles
(title, salary, department_id) 
VALUES 
("CEO","125000", 1),
("CFO", "95000", 1),
("Operations Manager", "75000", 1), 
("Account Receivables", "45000", 2),
("Account Payables", "45000", 2)
("Systems Administrator", "40000", 3), 
("Account Executive", "35000", 5),
("HR Associate", "44000", 4),

INSERT INTO employees 
(first_name, last_name, role_id, manager_id) 
VALUES 
("Ricky", "Bobby", 1, null), 
("Ron", "Burgundy", 2, 1),
("Clark", "Kent", 3, 1),
("Monica", "Cash", 4, 2),
("Betty", "Boop", 5, 2),
("John", "Smith", 6, 3),
("Marsha", "Bradey", 7, 3),
("Pamela", "Anderson", 8, 3),
("Nick", "Smith", 9, 8);