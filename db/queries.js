const db = require("./connection");

class DBConnection {
  constructor(db) {
    this.db = db;
  }

  getAllEmployees() {
    return this.db
      .promise()
      .query("SELECT * FROM employees");
  }

  getRoles() {
    return this.db
      .promise()
      .query("SELECT * FROM roles");
  }

  getDepartments() {
    return this.db.promise().query("SELECT * from departments");
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
}
//
module.exports = new DBConnection(db);