import mongoose from 'mongoose'

const AuthSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true }
}, { collection: 'auth' })


const Auth = mongoose.model('Auth', AuthSchema)
export default Auth