import mongoose from 'mongoose';

const OrderLineItemSchema = new mongoose.Schema({
  title: { type: String },
  quantity: { type: Number },
  unit_amount: { type: mongoose.Types.Decimal128 },
  amount_discount: { type: mongoose.Types.Decimal128 },
  amount_subtotal: { type: mongoose.Types.Decimal128 },
  amount_tax: { type: mongoose.Types.Decimal128 },
  amount_total: { type: mongoose.Types.Decimal128 },
  currency: { type: String },
  image: { type: String },
  description: { type: String },
  order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  createdAt: {
      type: Date,
      default: new Date(),
  },
});

OrderLineItemSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret._id = ret._id.toString();
    ret.unit_amount = ret.unit_amount.toString();
    ret.amount_discount = ret.amount_discount.toString();
    ret.amount_subtotal = ret.amount_subtotal.toString();
    ret.amount_tax = ret.amount_tax.toString();
    ret.amount_total = ret.amount_total.toString();
    return ret;
  },
});


module.exports = mongoose.models.OrderLineItem ?? mongoose.model('OrderLineItem', OrderLineItemSchema)