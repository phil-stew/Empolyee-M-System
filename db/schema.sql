DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department(
    id INT,
    d_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE e_role(
    id INT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
    PRIMARY KEY (id)

);
CREATE TABLE team_member(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(35),
  last_name VARCHAR(35),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)

  
);


INSERT INTO department (id, d_name)
VALUES(1, 'Sales Rep');

INSERT INTO department (id, d_name)
VALUES(2, 'Customer Service');

INSERT INTO department (id, d_name)
VALUES(3, 'Cashier');

INSERT INTO department (id, d_name)
VALUES(4, 'Merchandiser');

INSERT INTO department (id, d_name)
VALUES(5, 'Inventory Control');

INSERT INTO department (id, d_name)
VALUES(6, 'Administration');


INSERT INTO e_role (id, title, salary, department_id)
VALUES(1, 'Manager', 90000.00, 1);

INSERT INTO e_role (id, title, salary, department_id)
VALUES(2, 'Supervisor', 60000.00, 1);

INSERT INTO e_role (id, title, salary, department_id)
VALUES(2, 'Team Member', 60000.00, 1);



INSERT INTO team_member (first_name, last_name, role_id, manager_id)
VALUES("Phil", "Stew", 1, 1);

INSERT INTO team_member (first_name, last_name, role_id, manager_id)
VALUES("Philn", "Stewn", 3, 9);

INSERT INTO team_member (first_name, last_name, role_id, manager_id)
VALUES("Philnp", "Stewnl", 3, 9);

INSERT INTO team_member (first_name, last_name, role_id, manager_id)
VALUES("Philnp", "Stewnl", 3, 9);
