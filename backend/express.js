const express = require("express");
const app = express();
const AuthControllers = require("./controllers/AuthControllers");
const UserController = require("./controllers/UserControllers");
const PetControllers = require("./controllers/PetControllers");
const { initDB } = require("./Models/init");
const { validateToken } = require("./midllewares/AuthMidlleware");
const cors = require("cors");
const upload = require("./Utils/multer");
const dotenv = require("dotenv");
dotenv.config();

initDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/signup", AuthControllers.Register);
app.post("/login", AuthControllers.Login);
app.get("/auth", validateToken, AuthControllers.Auth);

app.get("/user/:id", UserController.getUserById);
app.post("/update/:email", UserController.UpdateUser);
app.post("/updatePic/:email", UserController.UpdateUserPicture);
app.get("/user", UserController.GetAllUsers);
app.post("/save/:user/:pet", UserController.SavePet);
app.post("/unsave/:user/:pet", UserController.UnSavePet);
app.post("/useradd/pic", upload.single("file"), UserController.pictureProvider);

app.post(
  "/petadd/pic",
  upload.array("files", 3),
  PetControllers.PictureProvider
);
app.post("/petadd", PetControllers.CreatePet);
app.post("/deletePet", PetControllers.DeletePet);
app.get("/pet/:name", PetControllers.FindPetByName);
app.get("/pet", PetControllers.GetAllPets);
app.get(
  "/petuser/:id",
  UserController.GetUserPets,
  PetControllers.GetPetsByUserId
);

app.listen(3000, async () => {
  console.log("Server is running on port : 3000");
});
