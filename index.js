//connecting to db importing connection.js
const db = require("./db/connection");
const mysql2 = require("mysql2");
const inquirer = require("inquirer");
const console_table = require("console.table");


async function runApp() {
    
    console.log(`
  
===========================================================================
*************************** Work Force ************************************ 
===========================================================================
    `);
   inquirer.prompt([
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
    ]);
    
}


//     // .then((response) => {
//     //   console.log(response);
//     //   determineAction(response);
//     // });
// };

const determineAction = (answer) =>  {
    if (answer === "View all departments") {
      console.log("display all department");
    } else if (answer === "View all roles") {
      console.log("display all roles");
    } else if (answer === "View all employees") {
      console.log("display all employees");
    }
}

runApp();