const { ObjectId } = require("mongodb");
let petCollection;

module.exports = class PetDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      petCollection = await connection.collection("pet");
    } catch (e) {
      console.log(`Could not establish connection to pet collection ${e}`);
    }
  }

  static async addPet(petData) {
    petData.created_at = new Date().toISOString();
    petData.status = "Avaible";
    await petCollection.insertOne({ ...petData });
  }

  static async getPets() {
    const allPets = await petCollection.find({}).toArray();
    return allPets;
  }

  static async getPetsbyType(petType) {
    const petTypeResult = await petCollection.find({ type: petType }).toArray();
    return petTypeResult;
  }

  static async getPetById(id) {
    const findPet = await petCollection.findOne({ _id: new ObjectId(id) });
    return findPet;
  }

  static async getPetByName(name) {
    const findPet = await petCollection.findOne({ name: name  });
    return findPet;
  }

  
  static async getPetByListOfName(search) {
    
      const pets = await petCollection
       .find({
        name : {$in : search},
       }).toArray();
       console.log('petis',pets)
      return pets;
  
  }

  static async GetFullPet(queryObj) {
    return await petCollection.find(queryObj).toArray();
  }

  static async updatePet(petName, newData) {
    return await petCollection.updateOne(
      {
       name:petName
      },
      {
        $set: newData,
      }
    );
  }
};
