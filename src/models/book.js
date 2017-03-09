import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number },
  pages: { type: Number, required: true, min: 1 },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Book', schema);
