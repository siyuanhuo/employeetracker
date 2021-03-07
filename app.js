const inquirer = require('inquirer')
const ct = require('console.table')
const orm = require('./app/orm')

const questionList = [
  'Add department',
  'Add role',
  'Add employee',
  'View departments',
  'View roles',
  'View all employees',
  'Update employee role',
  'Exit'
]

async function addDepartment() {
  const data = await inquirer.prompt([
    {
      name: 'name',
      message: 'What is the department\'s name?'
    }
  ])
  orm.addDepartment(data)
}

async function addRole() {
  const departmentList = viewDepartments()
  const data = await inquirer.prompt([
    {
      name: 'title',
      message: 'What is the title?'
    },
    {
      name: 'salary',
      type: 'number',
      message: 'What is the salary?'
    },
    {
      name: 'departmentID',
      type: 'list',
      message: 'At which department?',
      choices: departmentList
    }
  ])
  orm.addRole(data)
}

async function addEmployee() {
  const roles = viewRoles()
  const managers = orm.getManager() //add to orm later
  const data = await inquirer.prompt([
    {
      name: 'firstName',
      message: 'What is the employee\'s first name?',
    },
    {
      name: 'lastName',
      message: 'What is the employee\'s last name?'
    },
    {
      name: 'roleID',
      type: 'list',
      message: 'What does the employee do?',
      choices: roles
    },
    {
      name: 'managerID',
      type: 'list',
      message: 'Who is the manager of this employee?',
      choices: managers
    }
  ])
  orm.addEmployee(data)
}

async function viewDepartments() {
  const table = orm.getDepartments()
  console.table(table)
}

async function viewRoles() {
  const table = orm.getRoles()
  console.table(table)
}

// view all employee + view employee by manager
async function viewEmployees() {
  const table = orm.getEmoloyees(data)
  console.table(table)
}

// update employee's role + update employee's manager
async function updateEmployee() {
  const employees = orm.getEmployee({'option': 'View all'})
}

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
