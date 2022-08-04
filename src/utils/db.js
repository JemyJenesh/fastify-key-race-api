import mongoose from "mongoose";

export const connectDatabase = () => {
  const url = process.env.DB_URL || "mongodb://localhost:27017/key-race";
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongodb");
    });
};
