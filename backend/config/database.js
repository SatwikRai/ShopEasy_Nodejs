const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/ShopEasy");
        console.log(`Successfully connected to MongoDB ${conn.connection.host}`);
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
