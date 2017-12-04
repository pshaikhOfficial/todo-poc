const handleError = require('./handle-error');
const fs = require('fs');
const path = require('path');
let db = require('./db.json');

module.exports = (req, res) => {
    let t = req.body;
    let todo = {
        id: Math.floor(Math.random()),
        title: t.title,
        complete: t.complete
    };
    db.todos.push(todo);
    fs.writeFile(path.join(__dirname + '/todo.json'), JSON.stringify(db), (err) => {
        if (err) {
            return handleError(err, res);
        }
        return res.json(todo);
    });
}