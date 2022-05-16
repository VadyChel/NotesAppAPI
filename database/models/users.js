import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isActivated: { type: Boolean, default: false }
}, { collection: 'users' })


const User = mongoose.model('User', UsersSchema)
export default User