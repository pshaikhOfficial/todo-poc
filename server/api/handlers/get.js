let db = require('./db.json');

module.exports = (req, res) => {
    return res.json(db.todos);
};