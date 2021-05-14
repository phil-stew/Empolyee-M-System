DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE team_member(
  first_name VARCHAR(35),
  last_name VARCHAR(35),
  role_id INT,
  manager_id INT
  
);

CREATE TABLE e_role(
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT

);

CREATE TABLE department(
    d_name VARCHAR(30)
);

INSERT INTO team_member (first_name, last_name, role_id, manager_id)
VALUES("Phil", "Stew", 3, 9);

INSERT INTO team_member (first_name, last_name, role_id, manager_id)
VALUES("Philn", "Stewn", 3, 9);

INSERT INTO team_member (first_name, last_name, role_id, manager_id)
VALUES("Philnp", "Stewnl", 3, 9);

INSERT INTO team_member (first_name, last_name, role_id, manager_id)
VALUES("Philnp", "Stewnl", 3, 9);