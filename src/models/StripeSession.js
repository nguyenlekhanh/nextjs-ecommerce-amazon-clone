// import mongoose from 'mongoose';

// const StripeSessionSchema = new mongoose.Schema({
//   email: { type: String },
//   stripe_session_id: { type: String },
//   createdAt: {
//       type: Date,
//       default: new Date(),
//   },
// });

// StripeSessionSchema.set('toJSON', {
//   transform: (doc, ret) => {
//     ret._id = ret._id.toString();
//     return ret;
//   },
// });


// module.exports = mongoose.models.StripeSession ?? mongoose.model('StripeSession', StripeSessionSchema)