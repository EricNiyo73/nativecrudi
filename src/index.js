import express from "express";
const app = express();
// import app from express();
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from 'mongoose'; 
dotenv.config();

import postRoute from "./routes/posts";
import bodyParser from 'body-parser';
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:true
    
  })
  .then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('something went wrong', err);
    process.exit();
});

app.use(cors());
app.get('/', (req, res) => {
   return res.json({message: "Welcome  I am testing again"});
});

app.use("/api/v1", postRoute);
app.listen("5000", () => {
  console.log("Server is listening on port 5000");
});
export default app;