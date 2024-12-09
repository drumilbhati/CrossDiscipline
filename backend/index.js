import express from 'express';
import userRouter from './router/user.router.js';
import eventsRouter from './router/events.router.js';
import enquiryRouter from './router/enquiry.router.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({
    origin: 'https://epsilon-recruitement-web.vercel.app', // Allow only the frontend origin
    credentials: true, // Allow cookies if you're using them
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    preflightContinue: false,
}
  ));
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(userRouter);
app.use(eventsRouter);
app.use(enquiryRouter);


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.log(error);
    process.exit(1);
});

// // Curb Cores Error by adding a header here
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//     );
//     next();
//   });

app.listen(PORT, async () => {
    console.log(`server up on port ${PORT}`);
  });