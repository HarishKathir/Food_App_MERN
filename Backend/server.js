import express from "express"
import cors from 'cors'
import {connectDB} from './config/db.js'


//app config
const app = express()
const port = 8080

//middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB()


app.get('/',(req,res) => {
    res.send("Connection Sucessfull !!!");
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`);
})