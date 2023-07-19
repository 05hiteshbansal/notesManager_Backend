const Notes = require("../models/notesmodel");
//const mongoose =require('mongoose')
exports.test = async (req, res) => {
    res.status(200).json({
        message: "true",
      });
};

exports.addNote = async (req, res) => {
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
};

exports.getAllNotes = async (req, res) => {
  const { uid } = req.body;
  const fetchData = await Notes.find({
    uid: uid,
  });
  console.log(fetchData);
  res.status(200).json({
    message: "true",
    fetchData,
  });
};

exports.deleteAllNotes = 
async (req, res) => {
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
};

exports.deleteNote = 
async (req, res) => {
  const { uid, dataid } = req.body;
  console.log(uid, dataid);
  const fetchData = await Notes.findOne({
    uid: uid,
    notes: [{ _id: dataid }],
  });
  console.log(fetchData);
  await fetchData.deleteOne();
  res.status(200).json({
    message: "deleted",
  });
};
