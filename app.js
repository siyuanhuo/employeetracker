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
  await orm.addDepartment(data)
  console.log(`Department '${data.name}' added to database.`)
}

async function addRole() {
  const rawList = await orm.getDepartments()
  let departmentList = []
  rawList.forEach(element => {
    departmentList.push(element.name)
  })
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
      name: 'department',
      type: 'list',
      message: 'At which department?',
      choices: departmentList
    }
  ])
  await orm.addRole(data)
  console.log(`Role '${data.department}' added to database`)
}

async function addEmployee() {
  const rawRoles = await orm.getRoles()
  const roles = []
  rawRoles.forEach(element => {
    roles.push(element.title)
  })

  const rawEmployee = await orm.getEmployees()
  const manager = []
  rawEmployee.forEach(element => {
    if(element.first_name || element.last_name){
      manager.push(element.first_name + ' ' + element.last_name)
    }
  })
  if (manager.length == 0) manager.push('No manager')
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
      name: 'role',
      type: 'list',
      message: 'What does the employee do?',
      choices: roles
    },
    {
      name: 'manager',
      type: 'list',
      message: 'Who is the manager?',
      choices: manager
    }
  ])
  await orm.addEmployee(data)
  console.log(`Employee '${data.firstName} ${data.lastName}' added to database`)
}

async function viewDepartments() {
  const table = await orm.getDepartments()
  console.table(table)
}

async function viewRoles() {
  const table = await orm.getRoles()
  console.table(table)
}

// view all employee
async function viewEmployees() {
  const table = await orm.getEmoloyees(data)
  console.table(table)
}

// update employee's role
async function updateEmployee() {
  const rawEmployee = await orm.getEmployees()
  const rawRole = await orm.getRoles()
  const data = await inquirer.prompt([
    {
      name: 'employee',
      message: 'Who do you want to edit?'
    },
    {
      name: 'role',
      type: 'list',
      message: 'What is the new title of this employee?',
      choices: ['a','b']
    }
  ])

}

async function processOption(option) {
  switch(option) {
    case 'Add department':
      await addDepartment()
      break;
    case 'Add role':
      await addRole()
      break;
    case 'Add employee':
      await addEmployee()
      break;
    case 'View departments':
      await viewDepartments()
      break;
    case 'View roles':
      await viewRoles()
      break;
    case 'View all employees':
      await viewEmployees()
      break;
    case 'Update employee role':
      await updateEmployee()
      break;
    default:
      break
  }
}

async function main() {
  while (true) {
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
    } else {
      await processOption(option)
    }
    
  }
}

main()
