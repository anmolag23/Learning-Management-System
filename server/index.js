import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import courseRoute from "./routes/course.route.js";
import mediaRoute from "./routes/media.route.js";
import purchaseRoute from "./routes/purchaseCourse.route.js";


dotenv.config({});
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;

//default middleware
app.use(express.json());
app.use(cookieParser());


app.use(cors({
    origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials:true
}));





//apis
app.use("/api/v1/media",mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase",purchaseRoute);



app.listen(PORT, ()=> {
    console.log(`Server listen at port ${PORT}`);
})