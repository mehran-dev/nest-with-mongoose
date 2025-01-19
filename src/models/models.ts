import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Enums
const PropertyType = ['RESIDENTIAL', 'CONDO'];
const UserType = ['BUYER', 'REALTOR', 'ADMIN'];

// User Schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    user_type: { type: String, enum: UserType, required: true },
    homes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Home' }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

// Home Schema
const homeSchema = new Schema(
  {
    address: { type: String, required: true },
    number_of_bedrooms: { type: Number, required: true },
    number_of_bathrooms: { type: Number, required: true },
    city: { type: String, required: true },
    listed_date: { type: Date, default: Date.now },
    price: { type: Number, required: true },
    land_size: { type: Number, required: true },
    propertyType: { type: String, enum: PropertyType, required: true },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    realtor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

// Image Schema
const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    home_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home',
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

// Models
const User = model('User', userSchema);
const Home = model('Home', homeSchema);
const Image = model('Image', imageSchema);

export { User, Home, Image };
