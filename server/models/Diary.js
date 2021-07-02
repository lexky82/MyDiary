const mongoose = require('mongoose');

const diarySchma = mongoose.Schema({
    title: {
        type: String,
        maxlength: 50
    },
    wheather: {
        type: String,
    },
    image: {
        type: Array,
    },
    content: {
        type: String
    },
    emotion: {
        type : String 
    },
    location: {
        type : Object
    }

})

const Diary = mongoose.model('diary', diarySchma)

module.exports = { Diary }