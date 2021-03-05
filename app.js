const inquirer = require('inquirer')
const ct = require('console.table')
const orm = require('./app/orm')

const questionList = [
  'Add department',
  'Add role',
  'Add employee',
  'View departments',
  'View roles',
  'View employees', //view all employee + by manager
  'Update employee', //update employee role + manager
  'Delete department',
  'Delete role',
  'Delete employee',
  'View the total uitlized budget of a department',
  'Exit'
]

async function addDepartment() {
  
}

async function addRole() {}

async function addEmployee() {}

async function viewDepartments() {}

async function viewRoles() {}

// view all employee + view employee by manager
async function viewEmployees() {}

// update employee's role + update employee's manager
async function updateEmployee() {}

async function deleteDepartment() {}

async function deleteRole() {}

async function deleteEmployee() {}

async function departmentBudget() {}


function processOption(option) {
  switch(option) {
    case 'Add department':
      addDepartment()
      break
    case 'Add role':
      addRole()
      break
    case 'Add employee':
      addEmployee()
      break
    case 'View departments':
      viewDepartments()
      break
    case 'View roles':
      viewRoles()
      break
    case 'View employees':
      viewEmployees()
      break
    case 'Update employee':
      updateEmployee()
      break
    case 'Delete department':
      deleteDepartment()
      break
    case 'Delete role':
      deleteRole()
      break
    case 'Delete employee':
      deleteEmployee()
      break
    case 'View the total uitlized budget of a department':
      departmentBudget()
      break
    default:
      break
  }
}

async function main() {
  let next = await inquirer.prompt([
    {
      name: 'continue',
      type: 'confirm',
      message: 'Welcome to employee tracker. \n Would you like to continue?'
    }
  ])

  while (next.continue) {
    let rawOption = await inquirer.prompt([
      {
        name: 'option',
        type: 'list',
        message: 'What would you like to do?',
        choices: questionList
      }
    ])
    let option = rawOption.option
    if(option == 'Exit') {
      console.log('Have a nice day')
      break
    }
    processOption(option)
  }
}

main()
