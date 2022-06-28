import express from "express";
import connectDB from "./config/db.js";
import router from './routes/contact.js';

connectDB();
const app = express();
const PORT = 5000;
app.use(express.json({limit: '50mb'}));
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

app.use('/contact', router);



