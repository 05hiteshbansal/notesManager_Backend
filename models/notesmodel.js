const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    uid: {
      type: String,
      require: true,
    },
    notes: [
      {
        note: {
          require: true,
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  });
  
module.exports=  mongoose.model("notes", schema);