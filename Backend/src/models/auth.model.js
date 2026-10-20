import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
    default:
      "https://ik.imagekit.io/swcg5kd9g/default_img.jpg?updatedAt=1789556248075",
  },
  is_verified:{
    type:Boolean,
    default:false
  }
});

const authModel = mongoose.model("users",authSchema)

export default authModel