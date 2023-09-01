import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String },
  isNew: { type: Boolean },
  oldPrice: { type: mongoose.Types.Decimal128 },
  price: { type: mongoose.Types.Decimal128 },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  brand: { type: String },
  createdAt: {
      type: Date,
      default: new Date(),
  },
});

module.exports = mongoose.models.Product ?? mongoose.model('Product', ProductSchema)