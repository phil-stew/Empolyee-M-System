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

    d_name VARCHAR(30)
);