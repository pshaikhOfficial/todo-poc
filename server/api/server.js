'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const status = require('http-status');
const cors = require('cors');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.text({ type: 'text/plain' }));
app.use(cors());
app.use((err, req, res, next) => {
    if (err) {
        return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ err: err.toString() });
    }
    else {
        return res.status(status.NOT_FOUND).json({ err: 'Not found' });
    }
});

app.use('/api/v1', require('./handlers')());

app.listen(8000, () => {
    console.log('Listening on port 8000!');
});

