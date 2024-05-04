const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static('public'));
const videoRoutes = require('./routes/videos');

app.use(cors());
app.use(express.json());
app.use('/videos', videoRoutes);

app.get('/', (req, res) => {
    res.send('videos/84e96018-4022-434e-80bf-000ce4cd12b8');
});

app.listen(8080, () => {
    console.log('Brainflix');
});