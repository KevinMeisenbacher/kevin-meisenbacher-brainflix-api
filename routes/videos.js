const express = require('express');
const router = express.Router();
const fs = require('fs');
const {v4: uuid} = require('uuid');

// Videos with all details you want on the video page
const videoDetails = require('../data/videos.json');

// Videos with just the main bits for the video list and stuff
const videos = (
    videoDetails.map(video => (
    {
        "id": video.id,
        "title": video.title,
        "channel": video.channel,
        "image": video.image
    }
    ))
)

//#region videos
// Send the videos to the frontend
router.get('/', (_, res) => {
    res.send(videos);
});

// Stuff for the frontend to pick a video
router.get('/:videoId', (req, res) => {
    const video = videoDetails.find(video => video.id === req.params.videoId);
    res.send(video);
});

// Upload a new video
router.post('/', (req, res) => {
    const newVideo = {
        id: uuid(),
        title: req.body.title,
        channel: 'Kevin',
        image: 'http://localhost:8080/images/image0.jpeg',
        description: req.body.description,
        views: 0,
        likes: 0,
        duration: '4:01',
        timestamp: new Date().getTime(),
        comments: []
    }

    videoDetails.push(newVideo);
    fs.writeFileSync('./data/videos.json', JSON.stringify(videoDetails, null, 2));
    res.send(videoDetails);
});
//#endregion

//#region comments
// Make a new comment
router.post('/:videoId/comments', (req, res) => {
    const video = videoDetails.find(video => video.id === req.params.videoId);

    const newComment = {
        id: uuid(),
        name: 'Kevin',
        comment: req.body.comment,
        likes: 0,
        timestamp: new Date().getTime()
    };

    video.comments.push(newComment);
    fs.writeFileSync('./data/videos.json', JSON.stringify(videoDetails, null, 2));
    res.send(video.comments);
}); 

// Send a video's comments to the frontend
router.get('/:videoId/comments/:commentId', (req, res) => {
    const video = videoDetails.find(video => video.id === req.params.videoId);
    const comment = video.comments.find(comment => comment.id === req.params.commentId);
    console.log(comment);
    res.send(comment);
})

// Unexist a comment forever
router.delete('/:videoId/comments/:commentId', (req, res) => {
    const video = videoDetails.find(video => video.id === req.params.videoId);
    const comment = video.comments.find(comment => comment.id === req.params.commentId);
    video.comments = video.comments.filter(
        ({id: commentId}) => commentId !== comment.id
    );
    fs.writeFileSync('./data/videos.json', JSON.stringify(videoDetails, null, 2));
    console.log(`${comment} deleted`);
    res.send(`${comment} deleted`);
})
//#endregion

module.exports = router;