const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('get all videos');
});

const videos = require('../data/videos.json');

router.get('/videos', (req, res) => {
    res.json(videos);
});

router.get('/videos/:video', (req, res) => {
    const video = req.params.video;
    res.send(video);
})

module.exports = router;