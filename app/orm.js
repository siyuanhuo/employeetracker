const db = require('./connection')('employee_tracker', 'Siyuan1993!')

async function addDepartment(data) {
  const name = data.name
  await db.query(`insert into department (name) value ('${name}');`)
}

async function addRole(data) {
  const title = data.title
  const salary = data.salary
  const department = data.department
  const departmentID = await db.query(`select id from department where name='${department}'`)
  const id = departmentID[0].id
  await db.query(
    `insert into role (title, salary, department_id) value ('${title}', ${salary}, '${id}')`)
}

async function addEmployee(data) {
  const firstName = data.firstName
  const lastName = data.lastName
  const title = data.role
  const manager = data.manager
  const titleID = await db.query(`select id from role where (title='${title}')`).then(ans => {
    return ans[0].id
  })
  let managerID = null
  if(manager != 'No manager') {
    const [first, last] = manager.split(' ')
    managerID = await db.query(
      `select id from employee where (first_name='${first}' and last_name='${last}')`).then(ans => { return ans[0].id })
  }
  await db.query(
    `insert into employee (first_name, last_name, role_id, manager_id)
     value ('${firstName}', '${lastName}', ${titleID}, ${managerID})`
  )
  
}

async function getDepartments() {
  return await db.query(`select * from department;`)
}

async function getRoles() {
  return await db.query(`select * from role;`)
}

// view all employees
async function getEmployees() {
  return await db.query(`select * from employee;`)
}

// update employee role
async function updateEmployee(data) {
  const fullName = data.name.split(' ');
  const newTitle = data.role
  const firstName = fullName[0]
  const lastName = fullName[1]
  const role = await db.query(
    `select id from role where title='${newTitle}'`)
  const roleID = role[0].id
  console.log(roleID)
  await db.query(
    `update employee set role_id=${roleID} where (first_name='${firstName}' and last_name='${lastName}')`)
}


module.exports = {addDepartment, addRole, addEmployee, getDepartments, getRoles, getEmployees, updateEmployee}