DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department(
    id INT NOT NULL,
    department VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)

);
CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(35),
  last_name VARCHAR(35),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)

  
);


INSERT INTO department (id, department)
VALUES(1, 'Sales Rep');

INSERT INTO department (id, department)
VALUES(2, 'Customer Service');

INSERT INTO department (id, department)
VALUES(3, 'Cashier');

INSERT INTO department (id, department)
VALUES(4, 'Merchandiser');

INSERT INTO department (id, department
VALUES(5, 'Inventory Control');

INSERT INTO department (id, department
VALUES(6, 'Administration');


INSERT INTO role (id, title, salary, department_id)
VALUES(1, 'Manager', 90000.00, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES(2, 'Supervisor', 60000.00, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES(3, 'Team Member', 60000.00, 1);



INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Phil", "Stew", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Philn", "Stewn", 3, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Philnp", "Stewnl", 3, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Philnp", "Stewnl", 3, 9);

SELECT team_member.last_name, team_member.first_name role.title AS role.id, role.salary AS salary, CONCAT(manager.first_name, ' ',manager.last_name) AS manager, department.department AS department
FROM employee
LEFT JOIN role ON role.id = role.title
LEFT JOIN team_member ON team_member.role_id = e_role.id
ORDER BY team_member.first_name;


SELECT empolyee.first_name, Employee.last_name, role.salary
FROM ((department INNER JOIN Employee ON department.department = employee.department_id)
INNER JOIN role ON role.title = employee.role_id);
