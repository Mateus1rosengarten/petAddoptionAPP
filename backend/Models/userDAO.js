const { ObjectId } = require("mongodb");

let userCollection;

module.exports = class UsersDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      userCollection = await connection.collection("users");
      console.log("userscol", userCollection);
    } catch (e) {
      console.log(`Could not establish connection to users collection ${e}`);
    }
  }

  static async createUser(userData) {
    userData.created_at = new Date();
    userData.login_attempts = 0;
    userData.role = "user";
    userData.bio = 'Write Something About you..'
    await userCollection.insertOne({ ...userData });
  }

  static async getUserByEmail(email) {
    return await userCollection.findOne({ email: email });
  }

  static async updateUser(userEmail, userData) {
    await userCollection.updateOne({ email: userEmail }, { $set: userData });
  }

  static async getUserById(userId) {
    return await userCollection.findOne({ _id: new ObjectId(userId) });
  }

  static async getUsers() {
    return await userCollection.find({}).toArray();
  }

  static async adoptPetToUser(userEmail, pet) {
    return await userCollection.updateOne(
      { email: userEmail },
      { $push: { adopted: pet } }
    );
  }

  static async fosterPetToUser(userEmail, pet) {
    return await userCollection.updateOne(
      { email: userEmail },
      { $push: { fostered: pet } }
    );
  }

  static async returnPet(userEmail, pet) {
    await userCollection.updateOne(
      { email: userEmail },
      { $pull: { fostered: pet } }
    );
    await userCollection.updateOne(
      { email: userEmail },
      { $pull: { adopted: pet } }
    );
  }

  static async savePetToUser(userEmail, pet) {
    return await userCollection.updateOne(
      { email: userEmail },
      { $push: { saved: pet } }
    );
  }

  static async UnSavePetFromUser(userEmail, pet) {
    return await userCollection.updateOne(
      { email: userEmail },
      { $pull: { saved: pet } }
    );
  }

  // static async GetUserPets(userEmail) {
  //   return await userCollection.findOne({ email: userEmail });
  // }
};
