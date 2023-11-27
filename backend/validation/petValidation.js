const Ajv = require("ajv");
const ajv = new Ajv();

const PetSchema = {
  type: "object",
  properties: {
    type: { type: "string" },
    name: { type: "string" },
    heigth: { type: "string" },
    weight: { type: "string" },
    color: { type: "string" },
    bio: { type: "string" },
    // dietary: { type: "string" },
    breed: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};

module.exports.PetValidation = ajv.compile(PetSchema);

/// some problems here