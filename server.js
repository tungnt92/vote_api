// Create express app
var express = require('express');
var app = express();
var db = require('./database.js');
const path = require('path');
var md5 = require('md5');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/assets'));
// Server port
var HTTP_PORT = 8000;
// Start server
app.listen(HTTP_PORT, () => {
  console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT));
});
// Root endpoint
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/login', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/login.html'));
});

app.get('/vote-king', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/vote-king.html'));
});

app.get('/vote-queen', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/vote-queen.html'));
});

app.get('/admin', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/admin.html'));
});

// Insert here other API endpoints
app.get('/api/users', (req, res, next) => {
  var sql = 'select * from user';
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }
    res.json({
      'message': 'success',
      'data': rows
    });
  });
});

// get King
app.get('/api/users/:gender', (req, res, next) => {
  var sql = 'select * from user where gender = ?';
  var params = [req.params.gender];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }
    res.json({
      'message': 'success',
      'data': rows
    });
  });
});

app.get('/api/user/:id', (req, res, next) => {
  var sql = 'select * from user where id = ?';
  var params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }
    res.json({
      'message': 'success',
      'data': row
    });
  });
});

app.post('/api/user/login', (req, res, next) => {
  var sql = 'select * from user where email = ? and password = ?';
  var params = [req.body.email, md5(req.body.password)];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }
    if (row !== undefined) {
      res.json({
        'message': 'success',
        'data': row
      });
    } else {
      res.status(401).json({'error': 'Can not found this user'});
    }
  });
});

app.post('/api/vote', (req, res, next) => {
  var sql = 'select * from user_vote where user_id = ?';
  var params = [req.body.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }
    if (row !== undefined) {
      if (row.vote_king === null) {
        db.run(
            `UPDATE user_vote set 
           vote_king = COALESCE(?,vote_king)
           WHERE id = ?`,
          [req.body.vote_king, req.body.id],
          function (err, result) {
            if (err) {
              res.status(400).json({'error': res.message});
              return;
            }
            res.json({
              'message': 'success, vote_king',
              'data': req.body.vote_king,
              'changes': this.changes
            });
          });
      } else if (row.vote_queen === null) {
        db.run(
            `UPDATE user_vote set 
           vote_queen = COALESCE(?,vote_queen)
           WHERE id = ?`,
          [req.body.vote_queen, req.body.id],
          function (err, result) {
            if (err) {
              res.status(400).json({'error': res.message});
              return;
            }
            res.json({
              'message': 'success, vote_queen',
              'data': req.body.vote_queen,
              'changes': this.changes
            });
          });
      } else {
        res.json({
          'message': 'Vote rui may'
        });
      }
    } else {
      var dataInsert = {
        user_id: req.body.id,
        vote_king: req.body.vote_king ? req.body.vote_king : null,
        vote_queen: req.body.vote_queen ? req.body.vote_queen : null
      };
      var sqlInsert = 'INSERT INTO user_vote (user_id, vote_king, vote_queen) VALUES (?,?,?)';
      var paramsInsert = [dataInsert.user_id, dataInsert.vote_king, dataInsert.vote_queen];
      db.run(sqlInsert, paramsInsert, function (err, result) {
        if (err) {
          res.status(400).json({'error': err.message});
          return;
        }
        res.json({
          'message': 'success',
          'data': dataInsert
        });
      });
    }
  });
});

app.get('/api/vote_result', (req, res, next) => {
  var sqlKing = 'SELECT ' +
    '    user_vote.vote_king as most_king_id, ' +
    '    COUNT(*) as most_king_count ' +
    'FROM ' +
    '    user ' +
    '        INNER JOIN user_vote ON ' +
    '            user_vote.user_id = user.id ' +
    'WHERE user_vote.vote_king IS NOT null ' +
    'GROUP BY ' +
    '    user_vote.vote_king ' +
    'ORDER BY ' +
    '    most_king_count DESC ' +
    'LIMIT 1';

  var sqlQueen = 'SELECT ' +
    '    user_vote.vote_queen as most_queen_id, ' +
    '    COUNT(*) as most_queen_count ' +
    'FROM ' +
    '    user ' +
    '        INNER JOIN user_vote ON ' +
    '            user_vote.user_id = user.id ' +
    'WHERE user_vote.vote_queen IS NOT null ' +
    'GROUP BY ' +
    '    user_vote.vote_queen ' +
    'ORDER BY ' +
    '    most_queen_count DESC ' +
    'LIMIT 1';

  db.get(sqlKing, [], (err, row) => {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }

    new Promise( (resole, reject) => {
      db.get(sqlQueen, [], (err, row) => {
        if (err) {
          res.status(400).json({'error': err.message});
          return;
        }

        resole(row);
      });
    }).then(function(queen) {
      const promise1 = new Promise(function (resolve, reject) {
        db.get('SELECT * from user where id = ?', [row.most_king_id], (err, row) => {
          if (err) {
            res.status(400).json({'error': err.message});
            return;
          }

          resolve(row);
        })
      });
      const promise2 = new Promise(function (resolve, reject) {
        db.get('SELECT * from user where id = ?', [queen.most_queen_id], (err, row) => {
          if (err) {
            res.status(400).json({'error': err.message});
            return;
          }

          resolve(row);
        })
      });

      Promise.all([promise1, promise2]).then((values) => {
        res.json({
          'message': 'success',
          'data': {
            king: Object.assign(values[0], {
              king_count: row.most_king_count
            }),
            queen: Object.assign(values[1], {
              queen_count: queen.most_queen_count
            })
          }
        });
      });
    })
  });
});

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});
