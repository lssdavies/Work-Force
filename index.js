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
  if (answer.tasks === "Update employee") {
    updateEmps();
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
  db.query(empQuery, function (err, rows) {
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
    db.query(addRequest, function (err,res) {
        if (err)    { 
        return err;
        } else {
        console.log("\n Successfully added!");
        runApp();
        }
    });
}

async function addRole() {
    //getting depts
     let depts = await function()   {  
     const getdepts = `SELECT * FROM department`
        db.query(getdepts, function (err, rows) {
          if (err) {
            return err;
          } else {
            // console.log(rows);
            //created an array of objects with depart info ie. id and name
            let deptList = rows;
            // console.log(deptList);
            //pulling out dept names
            let deptChoices = deptList.map(dept => dept.name);
            console.log(deptChoices)    
          }
        });
        //getting role and salary information
  inquirer.prompt([
    {
      type: "input",
      name: "newRole",
      message: "What is the name of the new role to be added?",
    },
    {
      type: "input",
      name: "newSalary",
      message: "What is the salary for the new role?",
    }
    ]).then(info => {
        let role = info.newRole;
        let salary = info.newSalary;
        console.log(role, salary);

    })
    }
}   

//         //storing repsonse values in array
//         

//         //retreving all departments currently in database to provide user with option to choose which depart to add the role to.
//         const getdepts = `SELECT * FROM department`
//         db.query(getdepts, function (err, rows) {
//           if (err) {
//             return err;
//           } else {
//             console.log(rows);
            
//           }
//         });

//     })
// function addRole() {
//     // query
//     let query = ("SELECT * FROM department ORDER BY 1")

//     // connection
//     con.query(query, function (err,res) {
//         if (err) return err;

//         // array that equals res
//         let departmentArr = res

//         // map it
//         let departments = res.map(d => d.name)

//         // inquirer
//         return inquirer
//             .prompt([
//                 {
//                     type: "input",
//                     name: "title",
//                     message: "Enter the title of the Role:"
//                 },
//                 {
//                     type: "input",
//                     name: "salary",
//                     message: "Enter Salary:"
//                 },
//                 {
//                     type: "list",
//                     name: "department",
//                     message: "Select Department:",
//                     choices: departments
//                 }
//             ])
//             .then(function (answers) {
//                 // get IDs of selected options

//                 let departmentID = ""

//                 for (i = 0; i < departmentArr.length; i++) {
//                     if (departmentArr[i].name === answers.department) {
//                         departmentID = departmentArr[i].id
//                     }
//                 }  

//                 let insertRole = (`INSERT INTO role (title,salary,department_id) VALUES ('${answers.title}','${answers.salary}', ${departmentID})`);
//                 con.query(insertRole, function (err,res) {
//                     if (err) return err;
//                     console.log("\n role added \n");
//                     // return to main menu
//                     mainMenu();
//                 });

//             })
//     })












//     // {
//     //   type: "input",
//     //   name: "deptLink",
//     //   message: "Which department is the the new role linked to?",
//     // },
  
//   //prepared statement
//   let addRequest = `INSERT INTO roles (title, salary, department_id) VALUES ('${input.newRole}', '${input.newRole}', '${input.deptLink}')`;
//   db.query(addRequest, function (err, res) {
//     if (err) {
//       return err;
//     } else {
//       console.log("\n Successfully added!");
//       runApp();
//     }
//   });
// }

function addEmp()   {

}

function updateEmps()   {

}

runApp();
