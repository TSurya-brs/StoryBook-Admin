import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server monogodb connection is ${connect.connection.host}`);
  } catch (error) {
    console.log("Mongodb connection error", error);
    process.exit(1);
  }
};
export default connectdb;
