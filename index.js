const express = require('express');
const app = express();
const videoRoutes = require('./routes/videos');

app.use('/videos', videoRoutes);

app.get('/', (req, res) => {
    res.send('Homepage');
});

app.listen(8080, () => {
    console.log('Brainflix');
});