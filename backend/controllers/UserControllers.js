const UsersDAO = require("../Models/userDAO");
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

  static async GetAllUsers(req, res) {
    try {
      const users = await UsersDAO.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.log('Error in GetAllUser Controller',error)
      res.status(404).json({ message: "Something got wrong on getAllUsers Controller" });
    }
  }

  static async pictureProvider(req, res) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path,{folder: 'users'});
      console.log('Cloudinary response:', result,);

      if (!result.secure_url) {
        return res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
      } 
      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      console.log('Error in Picture Provider Controller',error)
      res.status(404).json({ message: "Something got wrong on Picture Provider Controller"});
    }
  }

  static async UpdateUser(req, res) {
    try {
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
      console.log('Error in UpdateUser Controller',error)
      res.status(404).json({ message: "Something got wrong on updateUser Controller" });
    }
  }

  static async UpdateUserPicture(req, res) {
    try {
      const validRequest = ModelImg(req.body.file)
      if (!validRequest) {
        return res.status(400).json({
          sucess: false,
          message: "Something bad happened",
        });
      }

      const userEmail = req.params.email;
      const { userData } = req.body;
      const user = await UsersDAO.updatePicUser(userEmail, userData);

      return res.status(200).json({
        userupdated: user,
        success: true,
        message: "Profile picture updated",
      });
    } catch (error) {
      console.log('Error in UpdateUserPicture Controller',error)
      res.status(404).json({ message: "Something got wrong on updateUserPicture Controller" });
    }
  }



  static async SavePet(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;

      await UsersDAO.savePetToUser(userEmail, petId);

      return res.status(200).json({
        success: true,
        message: "Pet saved sucessfuly",
      });
    } catch (error) {
      console.log('Error in Save Controller',error)
      res.status(404).json({ message: "Something got wrong on SavePet Controller" });    
    }
  }

  static async UnSavePet(req, res) {
    try {
      const userEmail = req.params.user;
      const petId = req.params.pet;
      console.log('req.params,req.body',req.params,req.body)
      console.log('email ,pet',userEmail,petId);

      await UsersDAO.UnSavePetFromUser(userEmail, petId);

      return res.status(200).json({
        success: true,
        message: "Pet Unsaved sucessfuly",
      });
    } catch (error) {
      console.log('Error in UnSave Controller',error)
      res.status(404).json({ message: "Something got wrong on UnSavePet Controller" });
    }
  }

  static async GetUserPets(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UsersDAO.getUserById(id);
      req.saved = user.saved;
      next();
    } catch (error) {
      console.log('Error in GetUserPets Controller',error)
      res.status(404).json({ message: "Something got wrong on getUserPets Controller" });
    }
    
  }
};
