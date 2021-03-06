const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async() => {

    try{
        await mongoose.connect(db, {
            useNewUrlParser: true
        });                                     // this will return a promise
        console.log('Mongo connected!');
    } catch(err) {
        console.log(err.message);               // if there is an error, let the process fail
        process.exit(1); 
    }
}

 module.exports = connectDB;