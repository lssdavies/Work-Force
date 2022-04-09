const inquirer = require("inquirer");
const db = require("../connection");
const mysql = require("mysql2");
const console_table = require("console.table");
//const next = require('../../index')


// // view all departments
//     if (answers.mainMenu === "View all departments") {
//         let departmentQuery = "SELECT * FROM department ORDER BY 1";
//         con.query(departmentQuery, function (err, res) {
//             if (err)
//                 return err;
//             console.table(res);
//             // return to main menu
//             mainMenu();
//         });
//     }
//     // view all roles
//     if (answers.mainMenu === "View all roles") {
//         let roleQuery = "SELECT role.id, role.title, department.name AS department, role.salary FROM role, department WHERE role.department_id = department.id ORDER BY 1";
//         con.query(roleQuery, function (err, res) {
//             if (err)
//                 return err;
//             console.table(res);
//             // return to main menu
//             mainMenu();
//         });
//     }
//     // view all employees
//     if (answers.mainMenu === "View all employees") {
//         let employeeQuery = "SELECT	employee.id, employee.first_name, employee.last_name, role.title, department.name AS department,role.salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id ORDER BY 1;"
//         con.query(employeeQuery, function (err, res) {
//             if (err)
//                 return err;
//             console.table(res);
//             // return to main menu
//             mainMenu();
//         });
//     }
// export all view queriey fuinctions
module.exports = {
  viewAllDept,
  // viewAllRoles,
  // viewAllEmployees
};
