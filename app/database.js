import mongoose from 'mongoose'
import readFileSync from 'fs'

export default async () => {
  try {
    const connectionStr = process.env.MONGODB_CONNECTION_STRING
    const ca = [readFileSync('rds-combined-ca-bundle.pem')]

    console.log('MONGODB:', connectionStr)
    console.log(ca)
    await mongoose.connect(connectionStr, {
      sslValidate: true,
      sslCA:ca,
      useNewUrlParser: true,
    })

    console.log('Connection with database succeeded')
    return mongoose.connection

  } catch (e) {
    console.error('Error on connecting to the database:', e)
    throw e
  }
}
