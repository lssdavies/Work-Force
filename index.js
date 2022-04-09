//connecting to db importing connection.js
const inquirer = require("inquirer");
const db = require("./db/connection");
const mysql = require("mysql2");
const console_table = require("console.table");

async function runApp() {
  console.log(`

===========================================================================
*************************** Work Force ************************************
===========================================================================
    `);
  const choice = await inquirer
    .prompt([
      {
        type: "list",
        name: "tasks",
        message: "What can Work Force help you with today?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee's role",
          "Exit Work Force"
        ],
      },
    ])
    .then((choice) => {
      determineAction(choice);
    });
}

const determineAction = (answer) => {
  // console.log(answer);
  if (answer.tasks === "View all departments") {
    viewAllDept();
  }
  if (answer.tasks === "View all roles") {
    viewAllRoles();
  }
  if (answer.tasks === "View all employees") {
    viewAllEmps();
  }
  if (answer.tasks === "Add a department") {
    addDept();
  }
  if (answer.tasks === "Add a role") {
    addRole();
  }
  if (answer.tasks === "Add an employee") {
    addEmp();
  }
  if (answer.tasks === "Update an employee's role") {
    updateEmps();
  }
  if (answer.tasks === "Exit Work Force") {
    process.exit();
  }
};

//Get Queries
function viewAllDept() {
  const deptQuery = `SELECT department.id AS "DEPT ID",
  name AS "DEPT Name"
  FROM department`;
  db.query(deptQuery, function (err, rows) {
    if (err) {
      return err;
    } else {
      // console.log("i got here");
      console.table(rows);
      runApp();
    }
  });
}

function viewAllRoles() {
  const roleQuery = `SELECT roles.id
  AS "Job ID", 
  roles.title AS "Job Title", 
  roles.salary as Salary,
  department.name AS Department 
  FROM roles, department WHERE roles.department_id = department.id`;
  db.query(roleQuery, function (err, rows) {
    if (err) {
      return err;
    } else {
      // console.log("i got here");
      console.table(rows);
      runApp();
    }
  });
}

function viewAllEmps() {
  const empQuery = `SELECT	employees.id AS "EMP ID", 
  employees.first_name AS "First Name", 
  employees.last_name AS "Last Name", 
  roles.title AS Position, 
  department.name AS Department,
  roles.salary As Salary,
  CONCAT (manager.first_name, ' ', manager.last_name) AS Manager 
  FROM employees LEFT JOIN roles ON employees.role_id = roles.id
  LEFT JOIN department ON roles.department_id = department.id
  LEFT JOIN employees manager ON employees.manager_id = manager.id
  `;
  db.query(empQuery, (err, rows) => {
    if (err) {
      return err;
    } else {
      // console.log("i got here");
      console.table(rows);
      runApp();
    }
  });
}

//Add Queries
async function addDept()  {
    const input = await inquirer
        .prompt([
            {
                type: "input",
                name: "newDept",
                message: "What is the name of the new department?"
            }
        ]);
    //prepared statement 
    let addRequest = `INSERT INTO department (name) VALUES ('${input.newDept}')`;
    db.query(addRequest, (err,row) =>   {
        if (err)    { 
        return err;
        } else {
        console.log("\n Successfully added!");
        runApp();
        }
    });
}

function addRole() {
    //prepared statement to get all depts
    let getDepts = (`SELECT * FROM department`)

    // connection
    db.query(getDepts, (err,row) => {
        if (err) {
            return err;
        }

        // creating an array to store returned departments
        let depts = row;

        // pulling out 
        let deptsList = depts.map(dept => dept.name)

        // running inquirer to capture additional info for role
        return inquirer
          .prompt([
            {
              type: "input",
              name: "newRole",
              message: "What is the name of the new role to be added?",
            },
            {
              type: "input",
              name: "newSalary",
              message: "What is the salary for the new role?",
            },
            {
              type: "list",
              name: "depts",
              message: "Which Department is the role attacked to?",
              choices: deptsList,
            },
          ])
          .then((inputs) => {
            // getting department id from array depts by looping through the depts []
            let dept_Id = "";

            for (i = 0; i < depts.length; i++) {
              if (depts[i].name === inputs.depts) {
                dept_Id = depts[i].id;
              }
            }
            //prepared statement to add role
            let addRole = `INSERT INTO roles (title,salary,department_id) VALUES ('${inputs.newRole}','${inputs.newSalary}', ${dept_Id})`;
            db.query(addRole, (err, row) => {
              if (err) {
                return err;
              }
              console.log("\n Successfully added!");
              runApp();
            });
          });
    })
}
function addEmp()   {
    //prepared statement to get all roles
    let getRoles = (`SELECT * FROM roles`)
        db.query(getRoles, (err,rows) =>    {
        if (err)  {
            return err
        };

        // Sotring returned roles
        let roles = rows
        // console.log(rows)

        // pulling out 
        let rolesList = roles.map(role => role.title)
        // console.log(rolesList)
        //getting managers
        let managerQuery = (`SELECT id, concat(first_name, ' ', last_name) AS name, role_id, manager_id FROM employees`)
        db.query(managerQuery, (err,rows) =>    {
            if (err) {
                return err
            };

            let managers = rows

            let managerList = managers.map(manager => manager.name)
            //adding a none option to list
            managerList.push("None")        

            // running inquirer to capture all info for employee
            return inquirer
                .prompt([
                    {
                        type: "input",
                        name: "first_name",
                        message: "What is the employee's first name?"
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the employee's last name?"
                    },
                    {
                        type: "list",
                        name: "empRole",
                        message: "What role is this employee's job title?",
                        choices: rolesList
                    },
                    {
                        type: "list",
                        name: "manager",
                        message: "Who will this employee report to?",
                        choices: managerList
                    }
                ])
                .then((inputs) =>  {
                    // getting roles id from array depts by looping through the roles []

                    let roles_Id = ""; //declaring a place holder variable

                    for (i = 0; i < roles.length; i++) {
                        // console.log(roles)
                        //console.log(roles[i].id);
                        if (roles[i].title === inputs.empRole) {
                          roles_Id = roles[i].id;
                        }
                    }
                    
                    let emp_Id = ""; //declaring a place holder variable

                    for (index = 0; index < managers.length; index++) {
                        if (managers[index].name === inputs.manager) {
                            emp_Id = managers[index].id
                        }
                    }  

                    //prepared statement to add in employee
                    let addEmp = `INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${inputs.first_name}','${inputs.last_name}', ${roles_Id}, ${emp_Id})`;
                    db.query(addEmp, (err,row) =>   {
                        if (err) {
                        return err
                    };
                    console.log("\n Successfully added!");
                    runApp();
                    });
                }
                    
            )

        })
    })
}

function updateEmps()   {
  // getting all employees
  console.log('here')
  let getEmps =
    `SELECT id, concat(first_name, ' ', last_name) AS FROM employees`
  let getRoles = `SELECT id, title FROM roles`;

  // create connections
  db.query(getEmps, (err, rows) =>  {
    if (err)    {
        return err
    };
    console.log(rows)
    let employees = rows;
    // getting name
    let empList = employees.map(emp => emp.name);
    console.log(empList)

    db.query(getRoles, (err, rows) =>   {
      if (err)  {
          return err
        };

      let empRoles = rows;
      //role
      let empRolesList = empRoles.map(erole => erole.title);

      // capturing user input
      return inquirer
        .prompt([
          {
            type: "list",
            name: "emp",
            message: "Which employee do you want to update?",
            choices: empList,
          },
          {
            type: "list",
            name: "newRole",
            message: `What is ${emp} new role?`,
            choices: empRolesList,
          },
        ])
        .then((inputs) =>   {
          // get IDs of selected options

          let employeeID = "";

          for (i = 0; i < employeeArr.length; i++) {
            if (employees[i].name === inputs.emp) {
              employeeID = employees[i].id;
            }
          }

          let roles_Id = "";

          for (index = 0; index < roleArr.length; index++) {
            if (empRoles[index].title === inputs.newRole) {
              roles_ID = empRoles[index].id;
            }
          }
          //prepared statement to update selected emplyee
          let updateEmp = `UPDATE employee SET role_id = ? WHERE id = ?`;

          db.query(updateEmp, [roles_Id, employeeID], (err, row) => {
            if (err)    {
                return err
            };
            console.log("\n Successfully updated");
            runApp();

          });
        });
    });
  });
}

runApp();
