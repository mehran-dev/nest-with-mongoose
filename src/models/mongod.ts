import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    const DATABASE_URL = process.env.DATABASE_URL;

    await mongoose.connect(DATABASE_URL, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      //useCreateIndex: true, // Ensure indexes are created
    });

    console.log('Connected to MongoDB successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectToDatabase;
