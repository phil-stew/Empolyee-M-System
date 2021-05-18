DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
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


INSERT INTO role (id, title, salary, department_id)
VALUES(1, 'Manager', 90000.00, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES(2, 'Supervisor', 60000.00, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES(3, 'Team Member', 60000.00, 1);



INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Phil", "Stew", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Philn", "Stewn", 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Philnp", "Stewnl", 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Philnp", "Stewnl", 1, NULL );

