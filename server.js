require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const dbconnect = require("./config/dbconfig");
const Notes = require('./models/notesmodel')
dbconnect();
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

//const note=require("./routes/routes")
//app.get("/", note);

app.get("/",async (req, res) => {
  res.status(200).json({
    message: "true",
  });
});

app.post("/notes",async (req, res) => {
  console.log(req.body);
  const { uid, data } = req.body;
  console.log(uid);

  const preData = await Notes.findOne({ uid: uid });
  console.log(preData);
  if (preData) {
    console.log(data[0].note, 5555555555);
    preData.notes.push({ note: data[0].note });
    await preData.save();
    res.status(200).json({
      message: "true",
      preData,
    });
  } else {
    const fetchData = await Notes.create({
      uid: uid,
      notes: { note: data[0].note },
    });

    console.log(fetchData, 888888888888);
    res.status(200).json({
      message: "true",
      fetchData,
    });
  }
});

app.post("/getnotes", async (req, res) => {
  const { uid } = req.body;
  const fetchData = await Notes.find({
    uid: uid,
  });
  console.log(fetchData);
  res.status(200).json({
    message: "true",
    fetchData,
  });
});

app.delete("/allnotes", async (req, res) => {
  const { uid } = req.body;
  console.log(uid);
  const fetchData = await Notes.findOne({
    uid: uid,
  });
  console.log(fetchData);
  await fetchData.deleteOne();
  res.status(200).json({
    message: "deleted",
  });
});

app.post("/onenote", async (req, res) => {
  const { uid, dataid } = req.body;
  //console.log(uid, dataid);
  let fetchData = await Notes.find({
     uid:uid,
  })
  // await Notes.findOneAndUpdate(
  //   { uid: uid },
  //   { $pull: { notes: { _id:dataid } } },
  //   { safe: true, multi: false }
  // );
  fetchData[0].notes.pull({_id:dataid});
  console.log(fetchData);
  fetchData[0].save();
  res.status(200).json({
    message: "deleted",
    fetchData
  });
});


port = process.env.PORT||4000

app.listen(port, () => {
  console.log("app is connected successfully");
});
