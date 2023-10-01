const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/userdetail')
const Note = require('../models/Notes')
const { body, validationResult } = require('express-validator');


// add notes using POST : "/api/notes/addnotes"
router.post('/addnotes', fetchuser, body('title', "enter a title").isLength({ min: 3 }),
    body('description', 'description is must add something').isLength({ min: 5 })
    , async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const validation = validationResult(req);
            if (!validation.isEmpty()) {
                return res.status(400).json({ error: validation.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id,
            })
            const saveNotes = await note.save();
            res.json(saveNotes)
        } catch (error) {
            console.log(error);
            res.status(500).send("internal server error")
        }
    }
)

// Get all the notes  using : "/api/auth/fetchnotes"
router.get('/fetchnotes', fetchuser, async (req, res) => {
    const note = await Note.find({ user: req.user.id });
    res.json(note)
})

// update an existing node : "/api/auth/updatenode"
router.put('/updatenote/:id', fetchuser, body('title', "enter a title").isLength({ min: 3 }),
    body('description', 'description is must add something').isLength({ min: 5 })
    , async (req, res) => {
        try {

            // if we directly send the id from header then do like this and use only /updatenote
            // const { title, description, tag } = req.body;
            // const newNote = {}
            // if(title) {newNote.title = title}
            // if (description) { newNote.description = description }
            // if (tag) { newNote.tag = tag }

            // const token = req.header('id-token');
            // let note = await Note.findById(token);
            // if(!note) {
            //     return res.status(404).send("not found");
            // }

            // console.log(note);
            // console.log(req.user.id);
            // if(note.user.toString() !== req.user.id){
            //     return res.status(401).send("not found");
            // }

            // note = await Note.findByIdAndUpdate(token, {$set : newNote}, {new: true})
            // res.json({note});

            // if we send id directly from the directry like updatenote/:id
            const { title, description, tag } = req.body;
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            let note = await Note.findById(req.params.id); // we are taking params because we are taking id in the path of updatenotes
            if (!note) {
                return res.status(404).send("not found");
            }

            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("not found");
            }

            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("internal error");
        }
    }
)

// for delete the note using : "/api/notes/deletenode/:id"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not found");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.status(200).send({ "success": "note deleted succesfully", note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal error");
    }
})

module.exports = router;