const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '361010theone',
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('hi good to goo')
  runSearch()
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View All Employees',
        'View By Department',
        'View By Manager',
        'Add Employee',
        'Remove Employee',
        'Update Role',
        'Update Manager',
        'View Roles',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View All Employees':
          employeeSearch();
          break;

        case 'View By Department':
          departmentSearch();
          break;

        case 'View By Manager':
          managerSearch();
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Remove Employee':
          removeEmployee();
          break;

          case 'Update Role':
          updateRole();
          break;

        case 'Update Manager':
          updateManager();
          break;

        case 'View Roles':
          roleSearch();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};


const employeeSearch = () => {

   const query = connection.query('SELECT * FROM team_member', (err,res)=>{
      if (err) throw err;
      res.forEach(({id, first_name, last_name, role_id, manager_id})=>{
        console.log(`${id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id}`)
      });
      console.log('-------------------------')
      
    });
  runSearch()
};

const departmentSearch = () => {

 const query = connection.query('SELECT * FROM department', (err,res)=>{
    if (err) throw err;
    res.forEach(({d_name})=>{
      console.log(`${d_name}`)
    });
    console.log('-------------------------')
    
  });runSearch()
};

const roleSearch = () => {

  connection.query('SELECT * FROM e_role', (err,res)=>{
    if (err) throw err;
    res.forEach(({title, salary, })=>{
      console.log(`${title} | ${salary} `)
    });
    console.log('-------------------------')
  });

};