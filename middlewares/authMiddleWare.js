const JWT = require("jsonwebtoken");
const userModel = require("../model/userModel");

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(
      `Error in authMiddleWare requireSignIn -> Error Message : ${error}`
    );
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`Error in authMiddleWare isAdmin -> Error Message : ${error}`);
    res.status(401).send({
      success: false,
      message: "Error in adminMiddleware",
      error,
    });
  }
};

module.exports = {
  requireSignIn: requireSignIn,
  isAdmin: isAdmin,
};
