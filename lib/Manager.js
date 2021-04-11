const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, office) {
    super(name, id, email);
    this.role = "Manager";
    this.office = office;
  }

  getOfficeNumber() {
    return this.office;
  }
}

module.exports = Manager;
