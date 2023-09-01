import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  googleId: { type: String },
  imageUrl: { type: String },
  createdAt: {
      type: Date,
      default: new Date(),
  },
});

module.exports = mongoose.models.User ?? mongoose.model('User', UserSchema)