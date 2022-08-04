const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");
const isContactInList = async (id) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  let result = false;
  const normID = id.toString();
  data.map((contact) => {
    if (contact.id.toString() === normID) {
      result = true;
    }
  });
  return result;
};
const isNameInList = async (name) => {
  const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  let result = false;
  const normName = name.toLowerCase();
  data.map((contact) => {
    if (contact.name.toLowerCase() === normName) {
      result = true;
    }
  });
  return result;
};

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    return (
      data.filter(
        (contact) => contact.id.toString() === contactId.toString()
      )[0] || null
    );
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const inList = await isContactInList(contactId);
    if (inList) {
      const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));

      const contacts = data.filter(
        (contact) => contact.id !== contactId.toString()
      );
      console.log(contacts);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
    }
  } catch (err) {
    console.log(err.message);
  }
}
async function addContact(name, email, phone) {
  try {
    let data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const contact = { name, email, phone, id: uuidv4() };
    const iDIsLock = await isContactInList(contact.id);
    const nameIsLock = await isNameInList(name);
    if (!iDIsLock && !nameIsLock) {
      data.push(contact);
      await fs.writeFile(contactsPath, JSON.stringify(data));
    }
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  isContactInList,
  addContact,
};
