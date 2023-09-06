import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  source: { type: String },
  createdAt: {
      type: Date,
      default: new Date(),
  },
});

LogSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret._id = ret._id.toString();
    return ret;
  },
});


module.exports = mongoose.models.Log ?? mongoose.model('Log', LogSchema)