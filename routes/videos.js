const express = require('express');
const router = express.Router();
const fs = require('fs');
const {v4: uuid} = require('uuid');

const videoDetails = require('../data/videos.json');

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

router.get('/', (req, res) => {
    res.send(videos);
});

router.get('/:videoId', (req, res) => {
    const video = videoDetails.find(video => video.id === req.params.videoId);
    res.send(video);
});

router.post('/:videoId/comments', (req, res, next) => {
    const video = videoDetails.find(video => video.id === req.params.videoId);
    const newComment = {
        id: uuid(),
        name: 'Kevin',
        comment: req.body.comment,
        likes: 0,
        timestamp: new Date().getTime()
    };
    video.comments.push(newComment);
    res.send(video.comments);
    next();
}); 

router.get('/:videoId/comments/:commentId', (req, res) => {
    const video = videoDetails.find(video => video.id === req.params.videoId);
    const comment = video.comments.find(comment => comment.id === req.params.commentId);
    console.log(comment);
    res.send(comment);
})

router.delete('/:videoId/comments/:commentId', (req, res) => {
    const video = videoDetails.find(video => video.id === req.params.videoId);
    const comment = video.comments.find(comment => comment.id === req.params.commentId);
    video.comments = video.comments.filter(
        ({id: commentId}) => commentId !== comment.id
        // crapComment => comment !== crapComment
    );
    // fs.writeFileSync('filteredVideos.json', res.locals);
    console.log(`${comment} deleted`);
    res.send(`${comment} deleted`);
    // res.json(res.locals.video.comments);
    // res.send({status: `${id} deleted`});
})

module.exports = router;