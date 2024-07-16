const { ObjectId } = require("mongodb");

let userCollection;

module.exports = class UsersDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      userCollection = await connection.collection("users");
    } catch (error) {
      console.log(`Could not establish connection to users collection ${error}`);
    }
  }

  static async createUser(userData) {
    try {
    userData.created_at = new Date();
    userData.role = "user";
    const userCreated = await userCollection.insertOne({ ...userData });
    return userCreated;
    }
    catch(error) {
      console.log('ERROR IN CREATEUSER DAO',error);
    }
  };

  static async getUserByEmail(email) {
    try {
    const user = await userCollection.findOne({ email: email });
    return user;
  }
  catch(error) {
    console.log('ERROR IN GETUSERBYEMAIL DAO',error);
  };
}

  static async updateUser(userEmail, userData) {
    try {
    const user = await userCollection.updateOne({ email: userEmail }, { $set: userData });
    return user;
  }
  catch(error) {
   console.log('ERROR IN UPDATEUSER DAO',error);
  }
};

static async updatePicUser(userEmail, userData) {
  try {
  const user = await userCollection.updateOne({ email: userEmail }, { $set: { image:userData }});
  return user;
}
catch(error) {
 console.log('ERROR IN UPDATEUSER DAO',error);
}
};

  static async getUserById(userId) {
    try {
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    return user;
  }
  catch(error) {
    console.log('ERROR IN GETUSERBYID',error);
  }
}

  static async getAllUsers() {
    try {
    const users = await userCollection.find({}).toArray();
    return users;

  }
  catch(error) {
    console.log('ERROR IN GETALLUSERS DAO',error)
  }
};

  static async savePetToUser(userEmail, pet) {
    try {
    const petSaved = await userCollection.updateOne(
      { email: userEmail },
      { $push: { saved: pet } }
    );
    return petSaved;
  }
  catch(error) {
    console.log('ERROR IN SAVEPET DAO ',error);

  }
};

  static async UnSavePetFromUser(userEmail, pet) {
    try {
    const petUnsaved = await userCollection.updateOne(
      { email: userEmail },
      { $pull: { saved: pet } }
    );
    return petUnsaved;
  }
  catch(error) {
    console.log('ERROR IN UNSAVE PET DAO',error);

  }
}

};
