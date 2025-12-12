import mongoose from "mongoose";
import { DB_NAME } from "../constants/constant.js";

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_CONNECT}/${DB_NAME}`
    );
    console.log(
      `connected to db!! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("connection failed", error);
  }
};
export default connectToDB;
