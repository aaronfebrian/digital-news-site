import mongoose from "mongoose";

const dbConnect= async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        console.log('CONNECTED TO MONGODB SUCCESS...');
    } catch (error) {
        console.log('CONNECTED TO MONGODB FAILED...');
        process.exit(1);
    }
};

export default dbConnect;