const mongoose = require('mongoose');

async function connectToDatabase(){

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error in database connection "+error);
    }

}

module.exports = connectToDatabase;
