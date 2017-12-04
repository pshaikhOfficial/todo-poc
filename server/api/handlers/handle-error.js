const status = require('http-status');

module.exports = (err, res) => {
    return res.status(status.INTERNAL_SERVER_ERROR)
        .json({ err: err.toString() });
}