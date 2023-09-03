import mongoose from 'mongoose';

const OrderLineItemSchema = new mongoose.Schema({
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

OrderLineItemSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret._id = ret._id.toString();
    ret.price = ret.price.toString();
    ret.oldPrice = ret.oldPrice.toString();
    return ret;
  },
});


module.exports = mongoose.models.OrderLineItem ?? mongoose.model('OrderLineItem', OrderLineItemSchema)