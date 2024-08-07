const { MongoClient } = require("mongodb");
const UsersDAO = require("./userDAO");
const PetDAO = require("./petDAO");

module.exports.initDB = async function initDB() {
  const MONGODB_URL = process.env.REACT_APP_DB_URI;
  const DB = process.env.REACT_APP_DB_NAME;

  MongoClient.connect(MONGODB_URL)
    .then(async (connection) => {
      const db = connection.db(DB);
      await UsersDAO.injectDB(db);
      await PetDAO.injectDB(db);

      console.log("Connection to DB established");

      return;
    })
    .catch((error) => {
      console.log(`DB connection failed ${error}`);
      process.exit(1);
    });
};
