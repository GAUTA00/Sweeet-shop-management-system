import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema({
  sweetId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Sweet name is required'],
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Sweet price is required'],
    min: [0, 'Price must be positive'],
  },
  quantity: {
    type: Number,
    required: [true, 'Sweet quantity is required'],
    min: [0, 'Quantity must be non-negative'],
  },
}, {
  timestamps: true,
});

const Sweet = mongoose.model('Sweet', sweetSchema);
export default Sweet;
