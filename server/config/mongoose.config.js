//* Import the `connect` method from mongoose library to establish a connection with MongoDB
import { connect } from 'mongoose';
//* Import the dotenv package to load environment variables from the .env file
import dotenv from 'dotenv';

//* Load environment variables
dotenv.config();

//* Extract MongoDB URI and database name from environment variables
const MONGODB_URI = process.env.MONGODB_URI; // MongoDB URI
const DB_NAME = process.env.DB_NAME; // Database name



async function dbConnect() {
    try {
        await connect(MONGODB_URI, {
            dbName: DB_NAME,
        });
        console.log(`Pinged your deployment. You successfully connected to MongoDB! and your DB is : ${DB_NAME}`);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default dbConnect;