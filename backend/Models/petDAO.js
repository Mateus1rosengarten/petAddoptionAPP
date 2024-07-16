const { ObjectId } = require("mongodb");
let petCollection;

module.exports = class PetDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      petCollection = await connection.collection("pet");
    } catch (error) {
      console.log(`Could not establish connection to pet collection ${error}`);
    }
  }

  static async addPet(petData) {
    try {
      petData.created_at = new Date().toISOString();
      const petCreated = await petCollection.insertOne({ ...petData });
      return petCreated;
    } catch (error) {
      console.log("ERROR IN ADDPET DAO", error);
    }
  }

  static async getPets() {
    try {
      const allPets = await petCollection.find({}).toArray();
      return allPets;
    } catch (error) {
      console.log("ERROR IN GETPETS DAO", error);
    }
  }

  static async getPetById(id) {
    try {
      const findPet = await petCollection.findOne({ _id: new ObjectId(id) });
      return findPet;
    } catch (error) {
      console.log("ERROR IN GETPETBYID DAO", error);
    }
  }

  static async getPetByName(name) {
    const findPet = await petCollection.findOne({ name: name });
    return findPet;
  } //

  static async getPetByListOfName(search) {
    const pets = await petCollection
      .find({
        name: { $in: search },
      })
      .toArray();
    console.log("petis", pets);
    return pets;
  } //?

  static async deletePet(petId) {
    try {
      const petDeleted = await petCollection.deleteOne({
        _id: new ObjectId(petId),
      });
      return petDeleted;
    } catch (error) {
      console.log("ERROR IN DELETEPETDAO", error);
    }
  }
};
