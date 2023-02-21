const Notes = require('../models/Notes');
const { validationResult } = require('express-validator');

const addNotes = async (req,res) =>{
    try {
        const {title,description,tag} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const notes = await Notes.create({title,description,tag, user: req.user.id});

        res.status(200).json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error');
    }
}//add notes

const fetchuserallnotes = async (req,res) =>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.status(200).json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error');
    }
}//fetchuserallnotes

const updatenotes = async (req,res) =>{
    try {
        const {title,description,tag} = req.body;

        const newNote = {};

        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        let note = await Notes.findById(req.params.id);

        if(!note){return res.status(404).json("Not found")};

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});

        res.status(200).json({message:'update notes',note});

    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error');
    }
}//updates notes

const deletenotes = async (req,res) =>{
    try {
        let note = await Notes.findById(req.params.id);

        if(!note){return res.status(404).json("Not found")};

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id);

        res.status(200).json({message:'Note has been deleted successfully',note});

    } catch (error) {
        console.log(error.message);
        res.status(500).send('internal server error');
    }
}//deletenotes

module.exports ={
    addNotes,
    fetchuserallnotes,
    updatenotes,
    deletenotes
}