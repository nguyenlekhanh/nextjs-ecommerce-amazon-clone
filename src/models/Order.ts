import mongoose from 'mongoose';

// const OrderSchema = new mongoose.Schema({
//   stripe_session_id: { type: String },
//   amount_discount: { type: mongoose.Types.Decimal128 },
//   amount_subtotal: { type: mongoose.Types.Decimal128 },
//   amount_tax: { type: mongoose.Types.Decimal128 },
//   amount_total: { type: mongoose.Types.Decimal128 },
//   currency: { type: String },
//   user_email: { type: String, require: true},
//   createdAt: {
//       type: Date,
//       default: new Date(),
//   },
// });

// OrderSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret._id = ret._id.toString();
//     ret.amount_discount = ret.amount_discount.toString();
//     ret.amount_subtotal = ret.amount_subtotal.toString();
//     ret.amount_tax = ret.amount_tax.toString();
//     ret.amount_total = ret.amount_total.toString();
//     return ret;
//   },
// });


// module.exports = mongoose.models.Order ?? mongoose.model('Order', OrderSchema)