import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  dataBody: String,
  signatureBody: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);