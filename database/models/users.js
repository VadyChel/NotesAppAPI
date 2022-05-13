import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { collection: 'users' })


const User = mongoose.model('User', UsersSchema)
export default User