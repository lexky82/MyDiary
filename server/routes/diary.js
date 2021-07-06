const express = require('express');
const router = express.Router();
const { Diary } = require("../models/Diary");

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

module.exports = router;