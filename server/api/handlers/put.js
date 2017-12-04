const handleError = require('./handle-error');
const fs = require('fs');
const path = require('path');
let db = require('./db.json');

module.exports = (req, res) => {
    let found = false;
    let t = req.body;
    db.todos = db.todos.map((todo) => {
        if (todo.id === req.params.id) {
            found = true;
            todo.complete = t.complete;
            todo.title = t.title;
            return todo
        }
        return todo;
    });
    if (!found) {
        return handleError("Task not found.", res);
    }
    fs.writeFile(path.join(__dirname + '/todo.json'), JSON.stringify(db), (err) => {
        if (err) {
            return handleError(err, res);
        }
        return res.json(db.todos);
    });
}