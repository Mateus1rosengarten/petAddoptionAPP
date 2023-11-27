const { MongoClient } = require("mongodb");
const UsersDAO = require("./userDAO");
const PetDAO = require("./petDAO");

module.exports.initDB = async function initDB() {
  const MONGODB_URL =
    "mongodb+srv://MateusRosengarten:D3PqFqCn07JY3XPI@cluster0.gb7ngqj.mongodb.net/?retryWrites=true&w=majority";
  const DB = "petAdoption";

  MongoClient.connect(MONGODB_URL)
    .then(async (connection) => {
      const db = connection.db(DB);
      await UsersDAO.injectDB(db);
      await PetDAO.injectDB(db);

      console.log("Connection to DB established");

      return;
    })
    .catch((error) => {
      console.log(error);
      console.log(`DB connection failed ${error}`);
      process.exit(1);
    });
};
