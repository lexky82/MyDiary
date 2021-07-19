const express = require('express');
const router = express.Router();
const { Diary } = require("../models/Diary");
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

//=================================
//             Diary
//=================================

router.post("/", (req, res) => {
    const diary = new Diary(req.body)
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

router.get("/:id", (req, res) => {
    const id = req.params.id

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