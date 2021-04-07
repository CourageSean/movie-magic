const api_key = "efbbb302664f73b592e1d04eca61e7ec"
const PORT = process.env.Port || 5000
  require("dotenv").config()

const express = require("express")

const app = express()

app.listen(PORT,()=>{
    console.log("listening")
} )

console.log(process.env)