const UsersDAO = require("../Models/userDAO");
const PetDAO = require("../Models/petDAO");
const ModelImg = require("../validation/ImageModelValidation");
const sha256 = require("sha256");
const cloudinary = require('../Utils/claudinary');
const upload = require('../Utils/multer');
const { url } = require("../Utils/claudinary");

module.exports = class UserController {
  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UsersDAO.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UsersDAO.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async pictureProvider(req, res) {

    const  {image} = req.body
    try {
      const result = await cloudinary.uploader.upload(req.file.path,{folder: 'users'});
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

  static async updateUser(req, res) {
    try {
      const validRequest = ModelImg(req.body.file)
      if (!validRequest) {
        return res.status(400).json({
          sucess: false,
          message: "Something bad happened",
        });
      }

      console.log('OLHA!!!', validRequest)
      const userEmail = req.params.email;
      const { userData } = req.body;
      userData.password = sha256(userData.password);
      userData.repeatPass = sha256(userData.password);

      const user = await UsersDAO.updateUser(userEmail, userData);

      return res.status(200).json({
        userupdated: user,
        success: true,
        message: "User updated",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async Adopt(req, res) {
    try {
      const userEmail = req.params.user;
      const petName = req.params.pet;
      const adoptStatus = { status: "Adopted" };

      await UsersDAO.adoptPetToUser(userEmail, petName);
      await PetDAO.updatePet(petName, adoptStatus);

      return res.status(200).json({
        success: true,
        message: "Pet adopted sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async Foster(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;
      const fosteredStatus = { status: "Fostered" };

      await UsersDAO.fosterPetToUser(userEmail, petId);
      await PetDAO.updatePet(petId, fosteredStatus);

      return res.status(200).json({
        success: true,
        message: "Pet fostered sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async Return(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;
      const AvaibleStatus = { status: "Avaible" };

      await UsersDAO.returnPet(userEmail, petId);
      await PetDAO.updatePet(petId, AvaibleStatus);

      return res.status(200).json({
        success: true,
        message: "Pet returned sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async Save(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;

      await UsersDAO.savePetToUser(userEmail, petId);

      return res.status(200).json({
        success: true,
        message: "Pet saved sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async UnSave(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;

      await UsersDAO.UnSavePetFromUser(userEmail, petId);

      return res.status(200).json({
        success: true,
        message: "Pet Unsaved sucessfuly",
      });
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }

  static async GetUserPets(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UsersDAO.getUserById(id);
      console.log('usu',user)
      req.adopted = user.adopted;
      req.saved = user.saved;
      req.fostered = user.fostered;
      console.log('lista',req.saved,req.adopted,req.fostered)

      next();
    } catch (error) {
      res.status(404).json({ message: "Something got wrong" });
    }
  }
};
