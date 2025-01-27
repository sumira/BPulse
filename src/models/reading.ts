import mongoose from 'mongoose';

const ReadingSchema = new mongoose.Schema({
  temperature: Number,
  voltage: Number,
  current: Number,
  timestamp: { type: Date, default: Date.now },
  userId: String,
  deviceId: String
});

export const Reading = mongoose.models.Reading || mongoose.model('Reading', ReadingSchema);