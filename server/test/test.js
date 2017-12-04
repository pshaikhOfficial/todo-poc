
var assert = require('assert');
var express = require('express');
const bodyparser = require('body-parser');
var status = require('http-status');
var request = require('superagent');

var URL_ROOT = 'http://localhost:8000';

describe('Backend Server - Routes Test', function () {
  var server;
  var app;
  var todos;

  before(function () {
    app = express();
    app.use(bodyparser.json());
    app.use('/api/v1', require('../api/handlers')());
    server = app.listen(8000);
  });

  after(function () {
    server.close();
  });

  beforeEach(function (done) {
    todos = [];
    done();
  });

  beforeEach(function (done) {
    todos = [
      { id: "1", title: "aaa", complete: false },
      { id: "2", title: "bbb", complete: false },
      { id: "3", title: "ccc", complete: false },
      { id: "4", title: "ddd", complete: false },
      { id: "5", title: "fff", complete: false },
      { id: "6", title: "ggg", complete: false },
      { id: "7", title: "hhh", complete: false }
    ];
    done();
  });

  it('can query todos', function (done) {
    var url = URL_ROOT + '/api/v1/todos';

    request
      .get(url)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        assert.equal(JSON.stringify(res.body), JSON.stringify(todos));
        done();
      });
  });

  it('can add a todo', function (done) {
    var url = URL_ROOT + '/api/v1/todo';

    request
      .post(url)
      .send({
        title: "zzz",
        complete: true
      })
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (res.body) {
          done();
        }
      });
  });

  it('can update a todo', function (done) {
    var url = URL_ROOT + '/api/v1/todo/6';

    request
      .put(url)
      .send({
        id: "6",
        title: "yyy",
        complete: true
      })
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (res.body)
          done();
      });
  });

  it('can delete a todo', function (done) {
    var url = URL_ROOT + '/api/v1/todo/7';

    request
      .delete(url)
      .end(function (err, res) {
        if (err) {
          return done(err);
        }
        if (res.body)
          done();
      });
  });
});
