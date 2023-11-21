const express = require("express")
const connectDb = require("./dbConfig/dbConfig")
const dotenv = require("dotenv").config()
const cors = require("cors")

connectDb()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const corsOptions = {
    origin: '*',
    credentials: true, 
  };

app.use(cors(corsOptions))

app.use("/api/users",require('./routes/userroutes'))


app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})