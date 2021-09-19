import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// const db = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@signin.uwsar.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


const databaseConnection = {
    getConnect: () => {
        mongoose
          .connect(`${process.env.MONGODB_URI}`, { 
            
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then(() => console.log('connected successfully! Database name: Check-it'))
          .catch((err) => console.log(err.message));
    }
}


export default databaseConnection;



