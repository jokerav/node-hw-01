const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.table(contact);
      break;

    case "add":
      const data = await addContact(name, email, phone);
      console.table(data);
      break;

    case "remove":
      const contactsAfterRemove = await removeContact(id);
      console.table(contactsAfterRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
