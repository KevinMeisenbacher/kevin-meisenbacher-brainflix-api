const cors = require('cors');
const express = require('express');
const app = express();
const videoRoutes = require('./routes/videos');

const corsOptions = {
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, STATUS, OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.options('/videos', cors());

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static('public'));
app.use('/videos', videoRoutes);

app.get('/', (req, res) => {
    res.send('Homepage');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
});

app.listen(8080, () => {
    console.log('Brainflix');
});