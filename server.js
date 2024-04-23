const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.static('public'));
const videoRoutes = require('./routes/videos');

app.use(cors());
app.use(express.json());
app.use('/videos', videoRoutes);

app.get('/', (req, res) => {
    res.send('Homepage');
});

app.listen(8080, () => {
    console.log('Brainflix');
});