const express = require('express');
const router = express.Router();
const { Diary } = require("../models/Diary");
const multer = require('multer');


//=================================
//             Diary
//=================================

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, "../uploads/");
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

module.exports = router;