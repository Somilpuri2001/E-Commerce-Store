const userModel = require("../model/userModel");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const { hashPassword, comparePassword } = require("../utils/authUtil");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      res.send({ message: "Name is required" });
    }
    if (!email) {
      res.send({ message: "Email is required" });
    }
    if (!password) {
      res.send({ message: "Password is required" });
    }
    if (!phone) {
      res.send({ message: "Phone is required" });
    }

    //find user
    const exsistingUser = await userModel.findOne({ email: email });
    //if user found
    if (exsistingUser) {
      return res.status(200).send({
        success: false,
        message: "Alredy Registered. Please Login",
      });
    }

    //register a new user
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Registered Successfully. Please Login!",
      user,
    });
  } catch (error) {
    console.log(`Error in registerController -> Error Message: ${error}`);
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(202).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //token creation
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.status(200).send({
      success: true,
      message: "login successfull ",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(`Error in login controller -> error message : ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "somilpuri07@gmail.com",
      pass: "amzzyeldoikyndpn",
    },
  });

  try {
    const oldUser = await userModel.findOne({ email });

    if (!oldUser) {
      res.send({
        success: false,
        message: "No Registered User Found",
      });
    } else {
      const secret = oldUser._id + oldUser.password + process.env.JWT_SECRET;

      const token = await JWT.sign({ email: email }, secret, {
        expiresIn: "5m",
      });

      const mailOptions = {
        from: "somilpuri07@gmail.com",
        to: email,
        subject: "Link For Password Change",
        text: `As requested, link to change your password is http://localhost:3000/resetpassword/${oldUser._id}/${token}
         This link will expire in 5 minutes`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res.send({
        success: true,
        message:
          "A link to reset your password has been sent to your email address.",
      });
    }
  } catch (error) {
    console.log(
      `Error Occured in forgotPassword Controller -> Error Message:- ${error}`
    );
    res.send({
      success: false,
      message: "Error Occured. Please Try Again Later",
    });
  }
};

const tokenVerification = async (req, res) => {
  const { id, token } = req.body;

  const user = await userModel.findOne({ _id: id });

  const secret = user._id + user.password + process.env.JWT_SECRET;

  try {
    const decodeToken = await JWT.verify(token, secret);
    res.status(200).send({
      success: true,
      email: user.email,
    });
  } catch (error) {
    res.status(200).send({
      success: false,
    });
    console.log(`Error verifying -> ${error}`);
  }
};

const resetPassword = async (req, res) => {
  const { id, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    await userModel.findOneAndUpdate({ _id: id }, { password: hashedPassword });
    res.status(200).send({
      success: true,
      message: "Password Updated Successfully. Please Login",
    });
  } catch (error) {
    console.log(
      `Error occured while restting password -> Error Message: ${error}`
    );
    res.send({
      success: false,
      message:
        "An error occured while updating password. Please try again later",
    });
  }
};

module.exports = {
  registerController: registerController,
  loginController: loginController,
  forgotPasswordController: forgotPasswordController,
  tokenVerification: tokenVerification,
  resetPassword: resetPassword,
};
