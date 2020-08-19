const Employee = require("../lib/Employee");

class Engineer extends Employee {
    constructor(name,id,email,github) {
        super(name,id,email);
        this.github = github;
        this.role = 'Engineer';
    } 
    getGithub(github){
        github = this.github;
        return this.github;
    }
}

module.exports = Engineer;
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
