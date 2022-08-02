const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.normalize("./db/contacts.json");
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.log(data.toString()))
    .catch((err) => console.log(err.message));
}

module.exports = { listContacts };
