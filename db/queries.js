const db = require("./connection");

class DBConnection {
  constructor(db) {
    this.db = db;
  }

  getAllEmployees() {
    return this.db
      .promise()
      .query(
        "SELECT employees.id as 'Employee ID', employees.first_name AS 'First Name', employees.last_name AS 'Last Name', department.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name,' ',manager.last_name )  AS Manager, roles.title AS Role FROM employee LEFT JOIN role ON employees.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees manager ON manager.id = employees.manager_id ORDER BY employees.id"
      );
  }

  getRoles() {
    return this.db
      .promise()
      .query(
        "SELECT roles.id as ID, roles.title as 'Job Title', department.name as Department, roles.salary as Salary  FROM roles LEFT JOIN department ON roles.department_id = department.id"
      );
  }

  getDepartments() {
    return this.db.promise().query("SELECT * from department");
  }

  addDepartment(data) {
    const param = [data.name];
    return this.db
      .promise()
      .query("INSERT INTO department (name) VALUES(?)", param);
  }

  addRole(data) {
    const param = [data.title, data.salary, data.department_id];
    return this.db
      .promise()
      .query(
        "INSERT INTO roles (title,salary,department_id) VALUES(?,?,?)",
        param
      );
  }

  addEmployee(data) {
    const param = [
      data.first_name,
      data.last_name,
      data.role_id,
      data.manager_id,
    ];
    return this.db
      .promise()
      .query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)",
        param
      );
  }

  updateEmployeeRole(data) {
    const param = [data.role_id, data.id];
    return this.db
      .promise()
      .query("UPDATE employees SET role_id = ? WHERE id = ?", param);
  }

  //BONUS PART
  deleteEmployees(data) {
    const param = [data.id];
    return this.db.promise().query("DELETE FROM employees WHERE id = ?", param);
  }

  updateEmployeeManager(data) {
    const param = [data.manager_id, data.id];
    return this.db
      .promise()
      .query("UPDATE employees SET manager_id = ? WHERE id = ?", param);
  }
}
//
module.exports = new DBConnection(db);