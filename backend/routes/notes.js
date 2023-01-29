const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/auth');
const { body } = require('express-validator');
const {addNotes, fetchuserallnotes, updatenotes,deletenotes} = require('../controllers/notes');

// route 1: get all the notes using get method. Login required
router.get('/fetchuserallnotes',authenticationMiddleware,fetchuserallnotes);

//route 2 : add notes 
router.post('/addnotes',authenticationMiddleware,[
    body('title','Enter a valid title').isLength({ min: 3}),
    body('description', 'Description must be atleast 5 characters').isLength({min: 5}),

],addNotes);

//route to update notes
router.put('/updatenote/:id',authenticationMiddleware,updatenotes);

//route to delete notes
router.delete('/deletenote/:id',authenticationMiddleware,deletenotes);

module.exports = router