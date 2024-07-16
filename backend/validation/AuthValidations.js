const Ajv = require("ajv");
const ajv = new Ajv();

const registerSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    lastName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    repeatPassword : { type : "string"},
    number: { type: "string" },
    saved : { type: "array"},
   
  },
  required: ["name", "lastName", "email", "password","repeatPassword", "number"],
  additionalProperties: false,
};

const loginSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

module.exports.RegisterValidation = ajv.compile(registerSchema);
module.exports.LoginValidation = ajv.compile(loginSchema);
