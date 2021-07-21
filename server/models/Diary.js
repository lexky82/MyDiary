const mongoose = require('mongoose');

const diarySchma = mongoose.Schema({
    writer : {
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    weather: {
        type: String,
    },
    emotion: {
        type : String 
    },
    contents: {
        type: String
    },
    location: {
        type : Object
    },
    image: {
        type: Array,
    }
}, { timestamps : true })

const Diary = mongoose.model('mydiary', diarySchma)

module.exports = { Diary }