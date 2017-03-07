import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: { type: String, require: true },
  age: { type: Number },
  phone: { type: String, require: true },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Page', schema);
