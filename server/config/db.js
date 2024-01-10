const mongoose = require('mongoose')

const connectDB =async()=> {
    try {
        const conn= await mongoose.connect('mongodb://127.0.0.1:27017/google_user')
        console.log(`Connected to MongoDB database ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in Mongodb ${error}`)
    }
}

module.exports=connectDB