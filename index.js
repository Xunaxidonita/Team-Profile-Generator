const fs = require("fs");

const TeamInquirer = require("./src/TeamInquirer");
const generateIndexHtml = require("./src/page-template");

const inquirer = require("inquirer");

// TODO: Write html file

function writeToFile(team) {
  fs.writeFile("./dist/team.html", generateIndexHtml(team), (err) => {
    if (err) throw new Error(err);

    console.log("Page complete! Check out team.html to see the output!");
  });
}

const initApp = function () {
  console.log(`
  =================
  Create new Team
  =================
  `);
  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "start",
        message: "Do you want to build a team",
      },
    ])
    .then((answers) => {
      if (answers.start) {
        TeamInquirer().then((team) => {
          // generate html

          // write file
          writeToFile(team);
        });
      }
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

initApp();
