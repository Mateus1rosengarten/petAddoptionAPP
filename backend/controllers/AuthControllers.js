const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const {
  LoginValidation,
  RegisterValidation,
} = require("../validation/AuthValidations");
const UsersDAO = require("../Models/userDAO");
const { ObjectId } = require("mongodb");

module.exports = class AuthControllers {
  // REGISTER CONTROLLER

  static async Register(req, res) {
    try {
      const validRequest = RegisterValidation(req.body);                        // CHECK BACKEND VALIDATION
      if (!validRequest) {
        return res.status(404).json({
          sucess: false,
          message: "Please fill all fields",
        });
      }

      const userObject = req.body;
      const oldUser = await UsersDAO.getUserByEmail(userObject.email);           // GET EMAIL IN DB

      if (oldUser) {
        return res.status(404).json({                                           // CHECK EMAIL ALREADY EXIST
          success: false,
          myemail: userObject.email,
          message: "Email already exist",
        });
      }

      userObject.password = sha256(userObject.password);                       // DECODING PASSWORD

      await UsersDAO.createUser(userObject);                                   // CREATE USER IN DB


      const token = jwt.sign(                                                  // CREATE TOKEN
        {
          _id: userObject._id,
          name: userObject.name,
          email: userObject.email,
          lastName : userObject.lastName,
          password :userObject.password,
          bio : userObject.bio
        },
        "secret",
        {expiresIn:'12h'}
      );

      console.log("mytoke", token);

      return res.json({ token: token });                                    // RETURNING TOKEN
    } catch (error) {
      res.status(500).json({ message: "something went wrong on register controller", sucess: false });
      console.log(err);
    }
  }




  // LOGIN CONTROLLER

  static async Login(req, res) {
    try {
      const validRequest = LoginValidation(req.body);                      // CHECK BACKEND VALIDATION
      if (!validRequest) {
        return res.status(404).json({
          sucess: false,
          message: "Please Fill all fields",
        });
      }

      const user = await UsersDAO.getUserByEmail(req.body.email);         // CHECK IF EMAIL AND PASSWORD EXIST 
      if (!user || user.password != sha256(req.body.password)) {
        return res.status(404).json({
          success: false,
          message: "Wrong username or password",
        });
      }
      const token = jwt.sign(                                            // CREATE TOKEN
        {
          email: user.email,
          password: user.password,
          name: user.name,
          lastName: user.lastName,
          number: user.number,
          id: user._id,
        },
        "secret",
        {expiresIn:'12h'}
      );

      return res.json({                                               // RETURNING TOKEN
        auth: true,
        token: token,
        user: {
          _id: new ObjectId(user._id),
        },
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "something got wrong",
      });
    }
  }

  // AUTH CONTROLLER

  static async Auth(req, res) {
    try {
      console.log("user authenticated");
      res.json(req.user);
    } catch (e) {
      console.log("something got wrong");
    }
  }
};
