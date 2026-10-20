import authModel from "../models/auth.model.js";
import { sendEmail } from "../services/email.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadFile } from "../services/storage.service.js";

export const registerController = async (req, res, next) => {
  const { full_name, username, email, password, profile_img } = req.body;

  const isUserExists = await authModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message: "Invalid Credentials",
      sucess: false,
      error: "user already register with this credentials",
    });
  }

  const hash = await bcrypt.hash(password, 12);

  let file;
  if (req.file) {
    file = await uploadFile(req.file);
  }

  const user = await authModel.create({
    full_name,
    username,
    email,
    password: hash,
    profile_img: file.url,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRETS,
    { expiresIn: "15m" },
  );

  await sendEmail({
    to: email,
    subject: "Email verification",
    html: `<p>Hi ${username}</p>
              <p>thanks for registering to the EventManagement</p>
              <a href="http://localhost:3000/api/auth/verify_email?token=${token}">click</a>
              `,
  });

  res.status(201).json({
    message: "account created successfully",
  });
};

export const verifyEmailController = async (req, res, next) => {
  const { token } = req.query;
  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRETS);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
      success: false,
      error: error.message,
    });
  }

  const user = await authModel.findOne({ _id: decode.id });

  if (!user) {
    return res.status(400).json({
      message: "Invalid Token",
      success: false,
      error: "user not found",
    });
  }

  user.is_verified = true;

  await user.save();

  const html = `
     <h1>Email verified successfull</h1>
     <p>your email has been verified</p>
     <a href="http://localhost:3000/login">click</a>`;

  res.send(html);
};
