import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [6, "Email must be at least 6 characters long"],
    maxlength: [50, "Email must be less than 50 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ email: this.email }, process.env.JWTPRIVATEKEY, {
    expiresIn: "24h",
  });
  return token;
};
const userModel = mongoose.model("user", userSchema);
export default userModel;
