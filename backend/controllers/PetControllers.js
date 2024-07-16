const PetDAO = require("../Models/petDAO");
const ModelImg = require("../validation/ImageModelValidation");
const cloudinary = require("../Utils/claudinary");

module.exports = class PetControllers {
  static async CreatePet(req, res) {
    try {
      const validRequest = ModelImg(req.body.file);
      if (!validRequest) {
        return res.status(400).json({
          sucess: false,
          message: "No Valid Request,Problem with Picture",
        });
      }
      const petCreated = await PetDAO.addPet(req.body);
      res.status(200).json(petCreated);
      console.log("Pet Creater Sucesfull", petCreated);
    } catch (error) {
      res.status(404).json({
        sucess: false,
        message: "Something got wrong on CreatePet Controller",
      });
    }
  }

  static async GetAllPets(req, res) {
    try {
      const allPets = await PetDAO.getPets();
      res.status(200).json(allPets);
    } catch (error) {
      res.status(404).json({
        sucess: false,
        message: "Something got wrong on GetAllPets Controller",
      });
    }
  }

  static async PictureProvider(req, res) {
    try {
      const results = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, { folder: "pets" })
        )
      );

      const urls = results.map((result) => result.secure_url);

      if (urls.length) {
        return res.status(200).json({ urls });
      } else {
        return res.status(500).json({
          sucess: false,
          message: "Failed to upload images to Cloudinary",
        });
      }
    } catch (error) {
      console.log("Error uploading pictures", error);
      res
        .status(500)
        .json({ message: "Something got wrong on pictureProvider Controller" });
    }
  }

  static async FindPetByName(req, res) {
    const { name } = req.params;
    try {
      const pet = await PetDAO.getPetByName(name);

      res.status(200).json({ pet: pet });
    } catch {
      res.status(404).json({
        sucess: false,
        message: "Something got wrong on FindPetByName Controller",
      });
    }
  }

  static async FindPetByType(req, res) {
    const { type } = req.params;
    try {
      const pet = await PetDAO.getPetsbyType(type);
      res.status(200).json(pet);
    } catch (error) {
      res
        .status(404).json({ 
            sucess: false
          , message: "Something got wrong on FindPetByType Controlle" });
    }
  }

  static async DeletePet(req, res) {
    const { id } = req.body;
    try {
      const deleted = await PetDAO.deletePet(id);
      res.status(200).json(deleted);
    } catch {
      res.status(404).json({sucess:
        false,
        message: "Something got wrong on deletePet Controller" });
    }
  }

  static async GetPetsByUserId(req, res) {
    try {
      const saved = req.saved
        ? await PetDAO.getPetByListOfName(req.saved)
        : [];
      res.status(200).json({
        success: true,
        saved,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({sucess:false,
         message: "Something got wrong on getPetByUserId Controller" });
    }
  }
};
