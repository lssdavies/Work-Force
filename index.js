//connecting to db importing connection.js
//const db = require("./db/connection");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const console_table = require("console.table");


async function runApp() {
    
    console.log(`
  
===========================================================================
*************************** Work Force ************************************ 
===========================================================================
    `);
  const answers = await inquirer.prompt([
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
    ]).then((answers) => {
      determineAction(answers);
    })
    
}

const determineAction = (answer) =>  {
    if (answer === "View all departments") {
      viewAllDept();
    } else if (answer === "View all roles") {
      console.log("display all roles");
    } else if (answer === "View all employees") {
      console.log("display all employees");
    }
}

//tasks functions
const viewAllDept = () => {
  
}

runApp();