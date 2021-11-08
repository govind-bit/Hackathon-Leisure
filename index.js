const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const path = require('path');

dotenv.config();

app.use(express.json());

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

 if(process.env.NODE_ENV==="production"){
   app.use(express.static(path.join(__dirname, '/frontend/build')));
   app.get("*", (req,res)=>{
     res.sendFile(path.join(__dirname,"frontend","build","index.html"));
   });
 } else{
   app.get("/", (req,res)=>{
     res.send("API running");
   });
 }

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Backend server is running!");
});
