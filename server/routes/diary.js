const express = require('express');
const router = express.Router();
const { Diary } = require("../models/Diary");
const { auth } = require('../middleware/auth')
const multer = require('multer');
const path = require('path')

//=================================
//             Diary
//=================================

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, "../server/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, new Date().valueOf() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

router.post("/", upload.array('images') ,(req, res) => {
    const body = JSON.parse(req.body.body);
    body.image = req.files;

    const diary = new Diary(body)
    
    diary.save((err) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).json({
            success: true
        });
    });
});

router.put('/', (req, res) => {
    const diary = new Diary()

    Diary.findOneAndUpdate({_id : req.body._id}, req.body, (err) => {
        if (err) return res.status(500).json({ success: false, err });

        return res.status(200).json({
            success: true
        });
    })
})

router.get("/", auth ,(req, res) => {
    const id = req.user._id

    Diary.find({ writer: id })
        .exec((err, DiaryData) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ diaryData: DiaryData })
        })
});

router.put("/removediary", (req, res) => {
    Diary.deleteOne({ _id: req.body._id })
        .then(() => {
            res.status(200).json({ success: true })
        })
        .catch((err) => {
            console.log(err)
        })
});

module.exports = router;