const express=require('express')
const router=express.Router()
const {test,addNote,getAllNotes,deleteAllNotes,deleteNote }=require("../controllers/notes_controller")


router.route('/notes').post(addNote)
router.route('/notes').get(getAllNotes)
router.route('/allnotes').delete(deleteAllNotes)
router.route('/notes').delete(deleteNote)
router.route('/').get(test)


module.exports=router