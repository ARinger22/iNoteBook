const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema ({
    user:{
        type : mongoose.Schema.Types.ObjectId, // it is a foreign key
        ref: 'users' // name used in Schema of User 
    },
    title:{
        type: String,
        required: true,
    },
    description :{
        type : String,
        required: true,
    },
    tag:{
        type: String,
        default: 'General',
    },
    date: {
        type:Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('notes', NoteSchema);