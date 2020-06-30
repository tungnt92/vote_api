var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    // db.run(`drop table user_vote`,
    //   (err) => {
    //     if (err) {
    //       // Table already created
    //     }
    //   });
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text,
            email text UNIQUE,
            gender text,
            password text,
            url_img text,
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert = 'INSERT INTO user (name, email, gender, password, url_img) VALUES (?,?,?,?,?)';
          db.run(insert, ['tun', 'admin@example.com', 'male', md5('password'), 'images/user/tun.jpg']);
          db.run(insert, ['tun', 'admin2@example.com', 'male', md5('password'), 'images/user/tun.jpg']);
          db.run(insert, ['tun', 'admin3@example.com', 'male', md5('password'), 'images/user/tun.jpg']);
          db.run(insert, ['tun', 'admin4@example.com', 'male', md5('password'), 'images/user/tun.jpg']);
          db.run(insert, ['tun', 'admin5@example.com', 'male', md5('password'), 'images/user/tun.jpg']);
          db.run(insert, ['tun', 'admin6@example.com', 'male', md5('password'), 'images/user/tun.jpg']);
          db.run(insert, ['tun', 'admin7@example.com', 'male', md5('password'), 'images/user/tun.jpg']);
          db.run(insert, ['tun', 'admin8@example.com', 'male', md5('password'), 'images/user/tun.jpg']);
          db.run(insert, ['tun', 'admin9@example.com', 'male', md5('password'), 'images/user/tun.jpg']);
          db.run(insert, ['tun', 'admin10@example.com', 'male', md5('password'), 'images/user/tun.jpg']);

          db.run(insert, ['runa', 'user1@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
          db.run(insert, ['runa', 'user2@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
          db.run(insert, ['runa', 'user3@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
          db.run(insert, ['runa', 'user4@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
          db.run(insert, ['runa', 'user5@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
          db.run(insert, ['runa', 'user6@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
          db.run(insert, ['runa', 'user7@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
          db.run(insert, ['runa', 'user8@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
          db.run(insert, ['runa', 'user9@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
          db.run(insert, ['runa', 'user10@example.com', 'female', md5('passsord'), 'images/user/runa.jpg']);
        }
      });

    db.run(`CREATE TABLE user_vote (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            vote_king INTEGER,
            vote_queen INTEGER,
            FOREIGN KEY(user_id) REFERENCES user(id)
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          var insert = 'INSERT INTO user_vote (user_id, vote_king, vote_queen) VALUES (?,?,?)';
          db.run(insert, ['1', '2', '11']);
          db.run(insert, ['2', '3', '11']);
          db.run(insert, ['3', '2', '10']);
          db.run(insert, ['4', '2', '10']);
        }
      });

  }
});

module.exports = db;
