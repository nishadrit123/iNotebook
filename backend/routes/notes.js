const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// Route 1: Fetch all notes of loggedin user using GET "/api/auth/fetchallnotes"

router.get('/fetchallnotes', fetchUser, async(req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error)
    }
});

// Route 2: Add a note for the user using POST "/api/auth/addnote"

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must have a minimum of 5 characters').isLength({ min: 5 }),
], async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const {title, description, tag} = req.body;
        const note = new Note({title, description, tag, user: req.user.id}) ;
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error)
    }
});

// Route 3: Update a note for the user using PUT "/api/auth/updatenote"

router.put('/updatenote/:id', fetchUser, async(req, res) => {
    try {
        const {title, description, tag} = req.body;
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
        let note = await Note.findById(req.params.id);
        if (!note) res.status(401).send('Not found');
        if (note.user.toString() !== req.user.id) res.status(401).send('Not authorised');
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        res.json(note);
    } catch (error) {
        console.log(error)
    }
});

// Route 4: Delete a note for the user using DELETE "/api/auth/deletenote"

router.delete('/deletenote/:id', fetchUser, async(req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) res.status(401).send('Not found');
        if (note.user.toString() !== req.user.id) res.status(401).send('Not authorised');
        note = await Note.findByIdAndDelete(req.params.id);
        res.json('Successfully deleted');
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;