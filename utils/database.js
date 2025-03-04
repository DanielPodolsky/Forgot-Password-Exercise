import mongoose from "mongoose";

// Connect to MongoDB

const connectToDatabase = () => {
  // Make sure dotenv or similar is loaded if using .env files

  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/?${process.env.MONGODB_OPTIONS}`;
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
};

// Define the schema for the "Product" collection

export default connectToDatabase;

`mongodb+srv://lambodol76:bctvlL3aczorTae4@cluster0.o0spv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
