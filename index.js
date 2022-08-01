console.log("Hello, world!");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.normalize("db/contacts.json");
fs.readFile(contactsPath)
  .then((data) => console.log(data.toString()))
  .catch((err) => console.log(err.message));
