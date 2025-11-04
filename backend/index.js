import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './utils/connectDb.js';
import { login, register, createEvent, getEvent, getOneEvent, participate, myParticipation, extraInfo } from './controller.js';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

app.post("/register" , register);
app.post("/login" , login);
app.post("/create-event", createEvent);
app.get("/get-events", getEvent);
app.get("/get-events/:id", getOneEvent);
app.post("/participate/:id", participate);
app.post("/my-participation", myParticipation);
app.post("/extra-info", extraInfo);

app.listen(process.env.PORT , () => {
    connectDb();
    console.log("server running of 8001");
})