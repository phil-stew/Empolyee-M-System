const mysql = require('mysql');
const inquirer = require('inquirer');
const util = require('util');
const { get } = require('http');

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

// attaches a promise to your querys to make asynchronous calls
connection.query = util.promisify(connection.query);

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
        'View Employees',
        'View Department',
        'View Roles',
        'Add Employee',
        'Add A Role',
        'Add Department',
        'Update Employee Role',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View Employees':
          employeeSearch();
          break;
        case 'View Department':
          departmentSearch();
          break;
        case 'View By Manager':
          viewManager();
          break;
        case 'View Roles':
          roleSearch();
          break;
        case 'Add Employee':
          addEmployee();
          break;
        case 'Add A Role':
          addRole();
          break;
        case 'Add Department':
          addDepartment();
          break;
        case 'Update Employee Role':
          updateRole();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};


async function getRoles() {
  const result = await connection.query("SELECT * FROM role");
  const rolesArr = await result.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
  return rolesArr;
}

async function getEmployees() {
  const result = await connection.query("SELECT * FROM employee");
  const employeeArr = await result.map((employee) => {
    return {
      name: employee.first_name + " " + employee.last_name,
      value: employee.id
    };
  });
  return employeeArr;
}

async function getDepartment() {
  const result = await connection.query("SELECT * FROM department");
  const departmentArr = await result.map((department) => {
    return {
      name: department.department,
      value: department.id
    };
  });
  return departmentArr;

}


async function getManager() {
  const result =  await connection.query("SELECT first_name, last_name, role_id FROM employee WHERE role_id = 1");
  const managerArr = await result.map((employee) => {
    return {
        name: employee.first_name,
        name1: employee.last_name,
        value: employee.role_id
      };
    });
  return managerArr;
}
getManager();

const employeeSearch = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
      console.log(`${id} | ${first_name} | ${last_name} | ${role_id} | ${manager_id}`)
    });
    console.log('-----------------------------------------------')
    runSearch()
  });
};
const departmentSearch = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    res.forEach(({ id, department }) => {
      console.log(`${id} | ${department}`)
    });
    console.log('----------------------------------------------')
  });
  runSearch()
};
const roleSearch = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    res.forEach(({ id, title, salary }) => {
      console.log(`${id} ${title} | ${salary} `)
    });
    console.log('-----------------------------------------------')
  });
  runSearch()
};
const viewManager = () => {
  connection.query('SELECT * FROM employee WHERE role_id = 3', (err, res) => {
    if (err) throw err;
    res.forEach(({ first_name, last_name }) => {
      console.log(`${first_name} | ${last_name} `)
    });
    console.log('-----------------------------------------------')
  });
  runSearch()
};
const addEmployee = async () => {
  const rolesArr = await getRoles();
  const departmentArr = await getDepartment();
  const managerArr = await getManager();
  
  inquirer
    .prompt([{
      name: 'first_name',
      type: 'input',
      message: 'What is the first name of the employee?',
    },

    {
      name: 'last_name',
      type: 'input',
      message: 'What is the last name of the employee?',
    },
    {
      name: 'department',
      type: 'rawlist',
      message: 'What department were they hired for?',
      choices: departmentArr
    },
    {
      name: 'role',
      type: 'rawlist',
      message: 'What position were they hired for?',
      choices: rolesArr
    },
    {
      name: 'manager_id',
      type: 'rawlist',
      message: "Who is this employee's manager?",
      choices: managerArr
    }])
    .then((res) => {
      console.log('Inserting a new product...\n');
    
      connection.query('INSERT INTO employee SET ?',
        {
          first_name: res.first_name,
          last_name: res.last_name,
          role_id: res.role_id,
          manager_id: res.manager_id,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} product inserted!\n`);
          console.log('-----------------------------------------------')
        });
      employeeSearch();
    })
}
const addDepartment = () => {
  inquirer
    .prompt([
    {
      name: 'nemdept',
      type: 'input',
      message: 'What is the name of the new department?',
    },
    ])
    .then((res) => {
      console.log('Inserting a new department...\n');
      console.log(res)
      connection.query('INSERT INTO department SET ?',
        {
          
          department: res.nemdept
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} product inserted!\n`);
          console.log('-----------------------------------------------')
          console.log(res)
          departmentSearch();
        });
    })
}
const addRole = () => {
  inquirer
    .prompt([{
      name: 'role',
      type: 'input',
      message: 'What role would you like to add?',
    },
    {
      name: 'salary',
      type: 'input',
      message: 'What is the salary of this role?',
    },
    {
      name: 'department',
      type: 'rawlist',
      message: 'What department is this role for?',
      choices: departmentArr,
    },
    ])
    .then((res) => {
      console.log('Inserting a new role...\n');
      connection.query('INSERT INTO role SET ?',

        {
          title: res.role,
          salary: res.salary,
          department_id: res.department
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} product inserted!\n`);
          // Call updateProduct AFTER the INSERT completes
          console.log('-----------------------------------------------')
        });
roleSearch();
    })
}
const updateRole = async () => {
  const rolesArr = await getRoles();
  const employeeArr = await getEmployees();
  
  inquirer
    .prompt([
      {
        name: 'employee',
        type: 'rawlist',
        message: 'What employee do you need to update?',
        choices: employeeArr
      },
      {
        name: 'role',
        type: 'rawlist',
        message: 'What position to update too..',
        choices: rolesArr
      },
    ]).then((res) => {
      console.log(res.employee)
      console.log(res.role)
      console.log('Inserting a new product...\n');
      connection.query('UPDATE employee SET employee.role_id = ? WHERE employee.id = ?',
        [res.role,
          res.employee
        ],
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} product inserted!\n`);
          console.log('-----------------------------------------------')
        });
employeeSearch()
    })
};

