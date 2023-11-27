const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  console.log("tkn", accessToken);

  try {
    const validToken = jwt.verify(accessToken, "secret");
    req.user = validToken;
    if (validToken) {
      console.log("validtok", validToken);
      console.log("user authenticate");
      return next();
    }
  } catch (err) {
    console.log("Failed to authenticate");
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
