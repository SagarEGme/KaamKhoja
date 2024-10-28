import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
dotenv.config({});

//deploy
import path from "path";
const _dirName = path.resolve();

const app = express();

//middlewares
app.use(express.json()) // to accept or send json values
app.use(express.urlencoded({ extended: true })) // for form data
app.use(cookieParser())
const corsOption = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT','DELETE'],
    credentials: true,
}
app.use(cors(corsOption))

//apis over here
app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

const PORT = process.env.PORT || 2000;

app.use(express.static(path.join(_dirName,"/frontend/dist")));
app.get("*",(_,res)=>{
    res.sendFile(path.resolve(_dirName,"frontend","dist","index.html"))
})
app.listen(PORT, () => {
    connectDB();
    console.log(`server running at port ${PORT}`)
})