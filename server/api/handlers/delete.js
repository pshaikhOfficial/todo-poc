let db = require('./db.json');
const fs = require('fs');
const path = require('path');
const handleError = require('./handle-error');

module.exports = (req, res) => {
    let todo = db.todos.filter((t) => {
        return t.id === req.params.id;
    });
    if (!todo || todo.length === 0) {
        return handleError("Task not found.", res);
    }
    db.todos = db.todos.filter((t) => {
        return t.id != req.params.id;
    });

    fs.writeFile(path.join(__dirname + '/todo.json'), JSON.stringify(db), (err) => {
        if (err) {
            return handleError(err, res);
        }
        return res.json(todo);
    });
}