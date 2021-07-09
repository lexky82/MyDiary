const express = require('express');
const router = express.Router();
const { Diary } = require("../models/Diary");
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

router.post("/", upload.array('images'))
router.post("/", (req, res) => {

    const diary = new Diary(req.body)

    diary.save((err) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).json({
            success: true
        });
    });
});

router.get("/", (req, res) => {
    Diary.find()
        .exec((err, DiaryData) => {
            if (err) return res.status(400).json({ success: false, err })
            return res.status(200).json({ diaryData: DiaryData })
        })
});

module.exports = router;