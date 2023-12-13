import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const mongouri = process.env.MONGODB_URI
    const conn = await mongoose.connect(mongouri)
    console.log(`MongoDB Connected: ${conn.connection.name}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
