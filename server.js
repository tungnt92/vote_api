// Create express app
var express = require('express');
var app = express();
var db = require('./database.js');
const path = require('path');
var md5 = require('md5');
var fs = require('fs');
const sharp = require('sharp');
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

app.get('/secret', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/secret.html'));
});

app.get('/create', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/create.html'));
});

app.get('/list', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/list.html'));
});

app.get('/update', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/update.html'));
});

app.get('/api/secret', (req, res, next) => {
  var sqlSecret = 'select * from user_vote' +
    ' left join (select id as id_user, name as name_user_id, url_img as url_img_user from user) u1 on user_vote.id = u1.id_user' +
    ' left join (select id as id_vote_king, name as name_vote_king, url_img as url_img_vote_king from user) u2 on user_vote.vote_king = u2.id_vote_king' +
    ' left join (select id as id_vote_queen, name as name_vote_queen, url_img as url_img_vote_queen from user) u3 on user_vote.vote_queen = u3.id_vote_queen';
  var paramsSecret = [];
  db.all(sqlSecret, paramsSecret, (err, rows) => {
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
  var sql = 'select * from user where gender = ? and email != ?';
  var params = [req.params.gender, 'admin@gumiviet.com'];
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
          [req.body.vote_king, row.id],
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
          [req.body.vote_queen, row.id],
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



const uploadImage = async (req, res, next) => {
  var sqlInsertUser = 'INSERT INTO user (name, email, gender, password, url_img) VALUES (?,?,?,?,?)';

  const hashPsw = md5(req.body.psw);
  const imgdata = req.body.img;
  const fileType = imgdata.split(';')[0];
  const mime = fileType.split('/')[1];

  const path = Date.now()+'.'+mime;
  const pathSaveFile = './assets/images/user/'+path;
  const pathSaveDB = 'images/user/'+path;

  // to convert base64 format into random filename
  const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');

  fs.writeFileSync(pathSaveFile, base64Data,  {encoding: 'base64'});

  var paramsInsertUser = [req.body.name, req.body.email, req.body.gender, hashPsw, pathSaveDB];

  // insert db
  db.run(sqlInsertUser, paramsInsertUser, function (err, result) {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }
    res.json({
      'message': 'success',
      'data': paramsInsertUser
    });
  });
};

app.post('/api/create', uploadImage);


app.del('/api/users/delete/:id', (req, res, next) => {
  var sql = 'DELETE FROM user WHERE id = ?;';
  var params = [req.params.id];
  db.run(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }
    res.json({
      'status': 204,
    });
  });
});

app.put('/api/users/update/:id', (req, res, next) => {

  var sqlCurrenUser = 'SELECT * FROM user WHERE id = ?;';
  var paramsUserId = [req.params.id];

  db.get(sqlCurrenUser, paramsUserId, (err, row) => {
    if (err) {
      res.status(400).json({'error': err.message});
      return;
    }
    var sqlUpdate;
    var params;
    var hashPsw =  md5(req.body.psw);

    // check image
    if(row.url_img === req.body.img) {
      // check email
      if(row.email === req.body.email) {
        sqlUpdate = 'UPDATE user SET name = ?, gender = ?, password =? WHERE id = ?;';
        params = [req.body.name, req.body.gender, hashPsw, req.params.id];
      } else {
        sqlUpdate = 'UPDATE user SET name = ?, email = ?, gender = ?, password =? WHERE id = ?;';
        params = [req.body.name, req.body.email, req.body.gender, hashPsw, req.params.id];
      }
    } else {
      // upload img
      const imgdata = req.body.img;
      const fileType = imgdata.split(';')[0];
      const mime = fileType.split('/')[1];

      const path = Date.now()+'.'+mime;
      const pathSaveFile = './assets/images/user/'+path;
      const pathSaveDB = 'images/user/'+path;

      // to convert base64 format into random filename
      const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');

      fs.writeFileSync(pathSaveFile, base64Data,  {encoding: 'base64'});
      // check email
      if(row.email === req.body.email) {
        sqlUpdate = 'UPDATE user SET name = ?, gender = ?, url_img = ?, password =? WHERE id = ?;';
        params = [req.body.name, req.body.gender, pathSaveDB, hashPsw, req.params.id];
      } else {
        sqlUpdate = 'UPDATE user SET name = ?, email = ?, gender = ?, url_img = ?, password =? WHERE id = ?;';
        params = [req.body.name, req.body.email, req.body.gender, pathSaveDB, hashPsw, req.params.id];
      }
    }

    db.run(sqlUpdate, params, (err, rows) => {
      if (err) {
        res.status(400).json({'error': err.message});
        return;
      }
      res.json({
        'status': 200
      });
    });
  });


});

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});
