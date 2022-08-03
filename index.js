const {
  listContacts,
  getContactById,
  removeContact,
  isContactInList,
  addContact,
} = require("./contacts.js");

console.log("index.js");
// listContacts().then((data) => console.log(data));

// getContactById(8).then((data) => console.log(data));
// removeContact(10);
// isContactInList(9).then((data) => console.log(data));
addContact("John Black", "stupidJohnSnow@wall.com", "(323) 123-45-20").then(
  (data) => console.log(data)
);
