import express from "express";
import connectDB from "./config/db.js";
import contactRouters from './routes/contact.js';
import authRouters from './routes/auth.js';

const PORT = 5000;

connectDB();
const app = express();
app.use(express.json({limit: '50mb'}));

app.use('/contact', contactRouters);
app.use('/auth', authRouters);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));



