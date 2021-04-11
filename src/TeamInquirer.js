const { default: templateBuilder } = require("@babel/template");
const { assertNewExpression } = require("@babel/types");
const inquirer = require("inquirer");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");

const Manager = require("../lib/Manager");

const questions = [
  "What's your manager's name?",
  "Enter an employee ID",
  "Provide an email",
  "What's the office number?",
  "What type of new member you want to add to the team?",
  "Enter a name for new member",
  "Enter an employee ID",
  "Enter an email",
  "Enter a Github username",
  "Enter a school",
  "Do you want to add another member?",
];

const positions = ["ngineer", "Intern"];
const positionConstructors = {
  "Add an Engineer": Engineer,
  "Add an Intern": Intern,
};
const employeeFromAnswers = function (answers) {
  if (answers.addorfinish === "Finish the team") {
    return null;
  }
  const EmployeeConstructor = positionConstructors[answers.addorfinish];
  const isIntern = answers.addorfinish === "Add an Intern";

  return new EmployeeConstructor(
    answers.name,
    answers.id,
    answers.email,
    isIntern ? answers.school : answers.github
  );
};

const getNewMember = function () {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "addorfinish",
        message:
          "Do you want to add an engineer or intern, or finish your team?",
        choices: ["Add an Engineer", "Add an Intern", "Finish the team"],
      },
      {
        type: "input",
        name: "name",
        message: questions[5],
        when: (answers) => answers.addorfinish !== "Finish the team",
      },
      {
        type: "input",
        name: "id",
        message: questions[6],
        when: (answers) => answers.addorfinish !== "Finish the team",
      },
      {
        type: "input",
        name: "email",
        message: questions[7],
        when: (answers) => answers.addorfinish !== "Finish the team",
      },
      {
        type: "input",
        name: "github",
        message: questions[8],
        when: (answers) => answers.addorfinish === "Add an Engineer",
      },
      {
        type: "input",
        name: "school",
        message: questions[9],
        when: (answers) => answers.addorfinish === "Add an Intern",
      },
    ])
    .then((answers) => {
      let member = employeeFromAnswers(answers);
      return {
        member: member,
      };
    });
};

const teamBuilder = function (members) {
  members = members || [];
  return new Promise((resolve) => {
    getNewMember().then((memberResult) => {
      if (memberResult.member) {
        members.push(memberResult.member);
        resolve(teamBuilder(members));
      } else {
        resolve(members);
      }
    });
  });
};

const TeamInquirer = function () {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: questions[0],
      },
      {
        type: "input",
        name: "managerId",
        message: questions[1],
      },
      {
        type: "input",
        name: "managerEmail",
        message: questions[2],
      },
      {
        type: "input",
        name: "managerOffice",
        message: questions[3],
      },
    ])
    .then((answers) => {
      // TODO get manager data from answers
      const manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOffice
      );
      let team = [manager];
      return teamBuilder().then((moreMembers) => {
        team = team.concat(moreMembers);
        return new Promise((resolve) => {
          resolve(team);
        });
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error("Something went wrong!");
        exit(1);
      } else {
        console.error(error);
      }
    });
};

module.exports = TeamInquirer;
