import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/route.js'; 
import dbConnect from './config/mongoose.config.js'// Ensure this path is correct based on your project structure


dotenv.config();

const app = express();
const PORT = process.env.PORT

//* Middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))

dbConnect()

app.use('/api', router); // Use the routes



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})