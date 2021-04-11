String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const determineThirdElementofCard = function (member) {
  let lastElement;
  if (member.role === "Manager") {
    lastElement = "Office number: " + member.office;
  } else if (member.role === "Engineer") {
    lastElement = getGitAccount(member.github);
  } else if (member.role === "Intern") {
    lastElement = "School : " + member.school.toProperCase();
  }
  return lastElement;
};

const generateItemList = function (member) {
  let myElements = [];
  let id = "ID: " + member.id;
  let email = genEmailLink(member.email);
  let last = determineThirdElementofCard(member);
  let listEl = [id, email, last];
  listEl.forEach((element) => {
    let newEl = `<li class="list-group-item">${element}</li>`;
    myElements.push(newEl);
  });
  return myElements;
};

const getPositionIcon = function (position) {
  return `<i class="bi bi-${positionIcons[position]}"></i>`;
};

const getGitAccount = function (github) {
  let gitLink = `<a href="https://github.com/${github.toProperCase()}" target="blank">Github: ${github.toProperCase()}</a>`;
  return gitLink;
};

const genEmailLink = function (email) {
  let emailLink = `<a href="mailto:${email}">Email : ${email}</a>`;
  return emailLink;
};

const createNewCard = function (member) {
  let name = member.name;
  let position = member.role.toLowerCase();
  const myIcon = getPositionIcon(position);
  const myElements = generateItemList(member);
  const htmlElements = myElements.join(`\n`);
  return `<div class="card">
    <div class="card-header primary">
      <h4>${name.toProperCase()}</h4>
      <div class="together">
        <h5>
         ${myIcon}
          ${position.toProperCase()}
        </h5>
      </div>
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush">
        ${htmlElements}
      </ul>
    </div>
  </div>`;
};

const cardsStack = function (team) {
  let myCards = [];
  team.forEach((member) => {
    let newCard = createNewCard(member);
    myCards.push(newCard);
  });
  let cardsHtml = myCards.join(`\n`);
  return cardsHtml;
};

const positionIcons = {
  manager: "cup-fill",
  engineer: "eyeglasses",
  intern: "journal-bookmark-fill",
};

const generateIndexHtml = function (team) {
  const teammates = cardsStack(team);
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
          crossorigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="./style.css" />
        <title>Team Profile Generator</title>
      </head>
      <body>
        <header>
          <h3>My Team</h3>
        </header>
    
        <section>
          ${teammates}
        </section>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
          crossorigin="anonymous"
        ></script>
      </body>
    </html>
    `;
};

module.exports = generateIndexHtml;
