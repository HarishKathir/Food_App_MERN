import express from "express"
import cors from 'cors'
import {} from 'dotenv/config'
import {connectDB} from './config/db.js'
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config
const app = express()
const port = process.env.PORT

//middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB()


//api endPoints
app.use("/api/product",productRouter);
app.use("/api/user",userRouter);
app.use("/images",express.static('uploads'));
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get('/',(req,res) => {
    res.send("Connection Sucessfull !!!");
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);
})