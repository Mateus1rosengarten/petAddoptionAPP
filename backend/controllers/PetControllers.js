const PetDAO = require("../Models/petDAO");

const ModelImg = require("../validation/ImageModelValidation");
const cloudinary = require('../Utils/claudinary');


module.exports = class PetControllers {
  static async createPet(req, res) {
    try {
      const validRequest = ModelImg(req.body.file)
      if (!validRequest) {
        return res.status(400).json({
          sucess: false,
          message: "Something bad happened",
        });
      }
      else {
        console.log('ERROR IN CREATEPET CONTROLLER,NO VALID REQUEST')
      }

      const pet = req.body;
      const petCreated = await PetDAO.addPet(pet);

      res.status(200).json(petCreated);
      console.log('PETCREATED!!!',petCreated)
    } catch (error) {
      res.status(404).json({ message: "something got wrong..." });
    }
  }

  // static async pictureProvider(req,res) {
  //   try {
      
  //     const result = await cloudinary.uploader.upload(req.file.path)
  //     console.log('resultado uRL image',result)
  //     return res.send({url : result.secure_url})
  //   }
  //   catch(error) {
  //     console.log('Error uploading picture',error)
  //   }

  // }

  static async getAllPets(req, res) {
    try {
      const allPets = await PetDAO.getPets();
      res.status(200).json(allPets);
    } catch (error) {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async pictureProvider(req, res) {

    const  {image} = req.body
    try {
      const result = await cloudinary.uploader.upload(req.file.path,{folder: 'pets'});
      console.log('Cloudinary response:', result,);

      if (result.secure_url) {
       
        return res.status(200).json({ url: result.secure_url });
      
      } else {
        return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
      }
    } catch (error) {
      console.log('Error uploading picture', error);
      return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
    }
  }

  // static async FindPetById(req, res) {
  //   const { id } = req.params;
  //   try {
  //     const pet = await PetDAO.getPetById(id);

  //     res.status(200).json({ pet: pet });
  //   } catch {
  //     res.status(404).json({ message: "something got wrong" });
  //   }
  // }

  static async FindPetByName(req, res) {
    const { name } = req.params;
    try {
      const pet = await PetDAO.getPetByName(name);

      res.status(200).json({ pet: pet });
    } catch {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async FindPetByType(req, res) {
    const { type } = req.params;
    try {
      const pet = await PetDAO.getPetsbyType(type);
      console.log("petByType", pet);
      res.status(200).json(pet);
    } catch (error) {
      res.status(404).json({ message: "something got wrong..." });
    }
  }

  static async FindFullPet(req, res) {
    const queryParameters = req.query;
    const queryObj = {};
    if (queryParameters.status) {
      queryObj.status = queryParameters.status;
    }
    if (queryParameters.type) {
      queryObj.type = queryParameters.type;
    }
    if (queryParameters.heigth) {
      queryObj.heigth = queryParameters.heigth;
    }
    if (queryParameters.weight) {
      queryObj.weight = queryParameters.weight;
    }
    if (queryParameters.name) {
      queryObj.name = queryParameters.name;
    }

    try {
      const result = await PetDAO.GetFullPet(queryObj);
      if (result) {
        console.log("nome", queryObj.type);
        res.status(200).send({
          sucess: true,
          pets: result,
        });
      } else {
        res.status(400).send({
          sucess: false,
          message: "Somethin got wrong ",
        });
      }
    } catch (error) {
      res.status(404).json({ message: "something got wrong " });
    }
  }

  static async deletePet(req, res) {
    const { id } = req.params;
    try {
      const deleted = await PetDAO.deletePet(id);
      res.status(200).json(deleted);
    } catch {
      res.status(404).json({ message: "something got wrong" });
    }
  }

  static async getPetsByUserId(req, res) {
    try {
     const saved = req.saved ? await PetDAO.getPetByListOfName(req.saved) : ['false'];
     const fostered = req.fostered ? await PetDAO.getPetByListOfName(req.fostered) : ['false'];
     const adopted = req.adopted ? await PetDAO.getPetByListOfName(req.adopted) : ['false'];

        console.log('svd',saved,fostered,adopted)

        res.status(200).send({
          success: true,
          message: "success",
          saved,
          fostered,
          adopted,
        });
    } catch (error) {
      console.log(error);
    }
  }
}