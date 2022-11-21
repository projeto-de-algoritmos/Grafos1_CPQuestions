import {ConnectOptions} from 'mongodb';
import mongoose from 'mongoose';

const MONGO_URI: string  = process.env.MONGO_URI && 
    process.env.MONGO_URI.length !== 0 ? 
        process.env.MONGO_URI : 
        'mongodb://localhost:27017/suspects';

const connectDb = async () => {
    await mongoose.connect(MONGO_URI);
    console.log('Connection to Database succeeded');
}

export default connectDb;