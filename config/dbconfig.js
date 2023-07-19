const mongoose = require("mongoose")


const dbconnect=()=>{
mongoose.connect(process.env.URL);
  try {
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log(error.message);
  }
  
}

module.exports= dbconnect