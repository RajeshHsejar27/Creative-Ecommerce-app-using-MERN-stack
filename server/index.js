//importing required libraries
import express from 'express';      //used as server
import dotenv from 'dotenv';        //Loads environment variables from .env file
import mongoose from 'mongoose';    //used to model the data and manage the DB easily
import authRoutes from '../server/routes/auth.js'; 
import morgan from 'morgan';        //HTTP request logger middleware
import categoryRoutes from './routes/category.js';
import productRoutes from './routes/product.js';
import cors from 'cors'; //a cross origin resource sharing library

dotenv.config();

const app = express(); 

//database connection
mongoose
  .connect(process.env.M_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("error : ", err));

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//router middleware
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

//  Adding a simple ping/health route to run when frontend loads
app.get("/ping", (req, res) => {
  res.send("pong");   // lightweight response
});

//getting port value from .env file
const port = process.env.PORT || 8000;

//logging server initiation
app.listen(port, () => {   
  console.log(`node server started on port ${port}`)
});
