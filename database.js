var sqlite3 = require('sqlite3').verbose();
var md5 = require('md5');

const DBSOURCE = 'db.sqlite';

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    // db.run(`drop table user`,
    //   (err) => {
    //     if (err) {
    //       // Table already created
    //     }
    //   });
    // db.run(`drop table user_vote`,
    //   (err) => {
    //     if (err) {
    //       // Table already created
    //     }
    //   });
    // db.run(`drop table setting`,
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
          db.run(insert, ['Admin', 'admin@gumiviet.com', 'male', md5('password'), 'images/user/admin.jpg']);
          db.run(insert, ['Gerard', 'nhatnguyen.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Gerard.jpg']);
          db.run(insert, ['Alice', 'thanhtrung.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Alice.jpg']);
          db.run(insert, ['Ant', 'thangnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Ant.jpg']);
          db.run(insert, ['Anthony', 'hoangtuan.tran@gumiviet.com', 'male', md5('password'), 'images/user/Anthony.jpg']);
          db.run(insert, ['Baku', 'bac.pham@gumiviet.com', 'male', md5('password'), 'images/user/Baku.jpg']);
          db.run(insert, ['Ban', 'van.tran@gumiviet.com', 'male', md5('password'), 'images/user/Ban.jpg']);
          db.run(insert, ['Betto', 'vietnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Betto.jpg']);
          db.run(insert, ['Bill', 'my.luu@gumiviet.com', 'male', md5('password'), 'images/user/Bill.jpg']);
          db.run(insert, ['Bruce', 'long.ly@gumiviet.com', 'male', md5('password'), 'images/user/Bruce.jpg']);
          db.run(insert, ['Chain', 'tin.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Chain.jpg']);
          db.run(insert, ['Chris', 'thanh.vo@gumiviet.com', 'male', md5('password'), 'images/user/Chris.jpg']);
          db.run(insert, ['Dahi', 'dangnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Dahi.jpg']);
          db.run(insert, ['Dan', 'my.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Dan.jpg']);
          db.run(insert, ['Daniel', 'toan.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Daniel.jpg']);
          db.run(insert, ['David', 'anh.pham@gumiviet.com', 'male', md5('password'), 'images/user/David.jpg']);
          db.run(insert, ['Eagle', 'conghan.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Eagle.jpg']);
          db.run(insert, ['Edmund', 'ducchinh.phung@gumiviet.com', 'male', md5('password'), 'images/user/Edmund.jpg']);
          db.run(insert, ['Eric', 'toanpham@gumiviet.com', 'male', md5('password'), 'images/user/Eric.jpg']);
          db.run(insert, ['Fuku', 'phuchuynh@gumiviet.com', 'male', md5('password'), 'images/user/Fuku.jpg']);
          db.run(insert, ['Gary', 'khoa.thai@gumiviet.com', 'male', md5('password'), 'images/user/Gary.jpg']);
          db.run(insert, ['Gin', 'tai.huynh@gumiviet.com', 'male', md5('password'), 'images/user/Gin.jpg']);
          db.run(insert, ['Hugh', 'hieu.tran@gumiviet.com', 'male', md5('password'), 'images/user/Hugh.jpg']);
          db.run(insert, ['Izumin', 'izumin.trung@gumiviet.com', 'male', md5('password'), 'images/user/Izumin.jpg']);
          db.run(insert, ['Jaian', 'anle.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Jaian.jpg']);
          db.run(insert, ['Zed', 'thuan.vu@gumiviet.com', 'male', md5('password'), 'images/user/Zed.jpg']);
          db.run(insert, ['Jot', 'phuhuy.tran@gumiviet.com', 'male', md5('password'), 'images/user/Jot.jpg']);
          db.run(insert, ['Kai', 'bang.pham@gumiviet.com', 'male', md5('password'), 'images/user/Kai.jpg']);
          db.run(insert, ['Kengo', 'kengo-hayano@gumiviet.com', 'male', md5('password'), 'images/user/Kengo.jpg']);
          db.run(insert, ['Kevin', 'vien.le@gumiviet.com', 'male', md5('password'), 'images/user/Kevin.jpg']);
          db.run(insert, ['Kuro', 'kuro.tuan@gumiviet.com', 'male', md5('password'), 'images/user/Kuro.jpg']);
          db.run(insert, ['Kyle', 'kyle.phu@gumiviet.com', 'male', md5('password'), 'images/user/Kyle.jpg']);
          db.run(insert, ['Leon', 'tuan.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Leon.jpg']);
          db.run(insert, ['Lynk Kyd', 'thai.pham@gumiviet.com', 'male', md5('password'), 'images/user/LinkKyd.jpg']);
          db.run(insert, ['Louis', 'ngocthach.duong@gumiviet.com', 'male', md5('password'), 'images/user/Louis.jpg']);
          db.run(insert, ['Medal', 'chuong.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Medal.jpg']);
          db.run(insert, ['Mido', 'minh.ngo@gumiviet.com', 'male', md5('password'), 'images/user/Mido.jpg']);
          db.run(insert, ['Nova', 'hoa.hoang@gumiviet.com', 'male', md5('password'), 'images/user/Nova.jpg']);
          db.run(insert, ['Otis', 'cong.do@gumiviet.com', 'male', md5('password'), 'images/user/Otis.jpg']);
          db.run(insert, ['Pat', 'dat.le@gumiviet.com', 'male', md5('password'), 'images/user/Pat.jpg']);
          db.run(insert, ['Ricky', 'kien.vu@gumiviet.com', 'male', md5('password'), 'images/user/Ricky.jpg']);
          db.run(insert, ['Riki', 'hoa.le@gumiviet.com', 'male', md5('password'), 'images/user/Riki.jpg']);
          db.run(insert, ['Ryan', 'lan.le@gumiviet.com', 'male', md5('password'), 'images/user/Ryan.jpg']);
          db.run(insert, ['S-One', 'duy.phan@gumiviet.com', 'male', md5('password'), 'images/user/S-One.jpg']);
          db.run(insert, ['Saint', 'son.le@gumiviet.com', 'male', md5('password'), 'images/user/Saint.jpg']);
          db.run(insert, ['Scot', 'hoang.duong@gumiviet.com', 'male', md5('password'), 'images/user/Scot.jpg']);
          db.run(insert, ['Seven', 'son.truong@gumiviet.com', 'male', md5('password'), 'images/user/Seven.jpg']);
          db.run(insert, ['Steve', 'hoangnhan.luu@gumiviet.com', 'male', md5('password'), 'images/user/Steve.jpg']);
          db.run(insert, ['Sugino', 'masanao.sugino@gumiviet.com', 'male', md5('password'), 'images/user/Sugino.jpg']);
          db.run(insert, ['Taho', 'thaonguyen@gumiviet.com', 'male', md5('password'), 'images/user/Taho.jpg']);
          db.run(insert, ['Takeshi', 'takeshi.tuan@gumiviet.com', 'male', md5('password'), 'images/user/Takeshi.jpg']);
          db.run(insert, ['Thirteen', 'huy.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Thirteen.jpg']);
          db.run(insert, ['Thomas', 'tu.doan@gumiviet.com', 'male', md5('password'), 'images/user/Thomas.jpg']);
          db.run(insert, ['Three', 'duy.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Three.jpg']);
          db.run(insert, ['Thu An', 'thuan.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/ThuAn.jpg']);
          db.run(insert, ['Tim', 'nhat.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Tim.jpg']);
          db.run(insert, ['Tivi', 'vule@gumiviet.com', 'male', md5('password'), 'images/user/Tivi.jpg']);
          db.run(insert, ['Tom', 'trungtinh.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Tom.jpg']);
          db.run(insert, ['Tony', 'quan.dinh@gumiviet.com', 'male', md5('password'), 'images/user/Tony.jpg']);
          db.run(insert, ['Trent', 'duc.do@gumiviet.com', 'male', md5('password'), 'images/user/Trent.jpg']);
          db.run(insert, ['Tun', 'tungnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Tun.jpg']);
          db.run(insert, ['Two', 'tu.ta@gumiviet.com', 'male', md5('password'), 'images/user/Two.jpg']);
          db.run(insert, ['Uzumaki', 'viet.dang@gumiviet.com', 'male', md5('password'), 'images/user/Uzumaki.jpg']);
          db.run(insert, ['Vader', 'thinh.trinh@gumiviet.com', 'male', md5('password'), 'images/user/Vader.jpg']);
          db.run(insert, ['Will', 'anhnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Will.jpg']);
          db.run(insert, ['Xin', 'trung.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Xin.jpg']);
          db.run(insert, ['Huy', 'huy.nguyenphan@gumiviet.com', 'male', md5('password'), 'images/user/Huy.jpg']);
          db.run(insert, ['Irirus', 'irirus.anh@gumiviet.com', 'male', md5('password'), 'images/user/Irirus.jpg']);

          db.run(insert, ['Nini', 'nhipham@gumiviet.com', 'female', md5('password'), 'images/user/Nini.jpg']);
          db.run(insert, ['Aki', 'ngoc.le@gumiviet.com', 'female', md5('password'), 'images/user/Aki.jpg']);
          db.run(insert, ['Alita', 'trinh.thai@gumiviet.com', 'female', md5('password'), 'images/user/Alita.jpg']);
          db.run(insert, ['Amy', 'amy.anh@gumiviet.com', 'female', md5('password'), 'images/user/Amy.jpg']);
          db.run(insert, ['Anise', 'anh.tran@gumiviet.com', 'female', md5('password'), 'images/user/Anise.jpg']);
          db.run(insert, ['Bella', 'ngoclan.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Bella.jpg']);
          db.run(insert, ['Hana', 'hanh.tran@gumiviet.com', 'female', md5('password'), 'images/user/Hana.jpg']);
          db.run(insert, ['Helen', 'nhi.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Helen.jpg']);
          db.run(insert, ['Joey', 'khanh.van@gumiviet.com', 'female', md5('password'), 'images/user/Joey.jpg']);
          db.run(insert, ['Kusa', 'kusa.thao@gumiviet.com', 'female', md5('password'), 'images/user/Kusa.jpg']);
          db.run(insert, ['Mia', 'ngoc.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Mia.jpg']);
          db.run(insert, ['Mimi', 'huyenmy@gumi.co.jp', 'female', md5('password'), 'images/user/Mimi.jpg']);
          db.run(insert, ['Midori', 'nhan.vuong@gumiviet.com', 'female', md5('password'), 'images/user/Midori.jpg']);
          db.run(insert, ['Moon', 'hangbui@gumiviet.com', 'female', md5('password'), 'images/user/Moon.jpg']);
          db.run(insert, ['Naoki', 'xuan.le@gumiviet.com', 'female', md5('password'), 'images/user/Naoki.jpg']);
          db.run(insert, ['Neko', 'dungbui@gumiviet.com', 'female', md5('password'), 'images/user/Neko.jpg']);
          db.run(insert, ['Peace', 'vy.tran@gumiviet.com', 'female', md5('password'), 'images/user/Peace.jpg']);
          db.run(insert, ['Ran', 'nhi.huynh@gumiviet.com', 'female', md5('password'), 'images/user/Ran.jpg']);
          db.run(insert, ['Rei', 'linh.hoang@gumiviet.com', 'female', md5('password'), 'images/user/Rei.jpg']);
          db.run(insert, ['Riri', 'hoa.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Riri.jpg']);
          db.run(insert, ['Rosa', 'van.bui@gumiviet.com', 'female', md5('password'), 'images/user/Rosa.jpg']);
          db.run(insert, ['Runa', 'tram.phan@gumiviet.com', 'female', md5('password'), 'images/user/Runa.jpg']);
          db.run(insert, ['Saly', 'suongphan@gumiviet.com', 'female', md5('password'), 'images/user/Saly.jpg']);
          db.run(insert, ['Sarah', 'thuyntt@gumiviet.com', 'female', md5('password'), 'images/user/Sarah.jpg']);
          db.run(insert, ['Sora', 'ngoctran.tran@gumiviet.com', 'female', md5('password'), 'images/user/Sora.jpg']);
          db.run(insert, ['Sunny', 'duong.tran@gumiviet.com', 'female', md5('password'), 'images/user/Sunny.jpg']);
          db.run(insert, ['Susan', 'suong.tran@gumiviet.com', 'female', md5('password'), 'images/user/Susan.jpg']);
          db.run(insert, ['Tamu', 'tham.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Tamu.jpg']);
          db.run(insert, ['Tanpopo', 'ngoc.tran@gumiviet.com', 'female', md5('password'), 'images/user/Tanpopo.jpg']);
          db.run(insert, ['Tomo', 'phuong.tran@gumiviet.com', 'female', md5('password'), 'images/user/Tomo.jpg']);
          db.run(insert, ['Umiko', 'nhi.ho@gumiviet.com', 'female', md5('password'), 'images/user/Umiko.jpg']);
          db.run(insert, ['Venus', 'khanh.le@gumiviet.com', 'female', md5('password'), 'images/user/Venus.jpg']);
          db.run(insert, ['Yoko', 'watanabe.yoko@gumiviet.com', 'female', md5('password'), 'images/user/Yoko.jpg']);
          db.run(insert, ['Yoshi', 'anh.vo@gumiviet.com', 'female', md5('password'), 'images/user/Yoshi.jpg']);
          db.run(insert, ['Claire', 'nguyen.bui@gumiviet.com', 'female', md5('password'), 'images/user/Claire.jpg']);
          db.run(insert, ['Clara', 'lien.huynh@gumiviet.com', 'female', md5('password'), 'images/user/Clara.jpg']);
          db.run(insert, ['Tamae', 'phuongpham@gumiviet.com', 'female', md5('password'), 'images/user/Tamae.jpg']);
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
          // var insert = 'INSERT INTO user_vote (user_id, vote_king, vote_queen) VALUES (?,?,?)';
        }
    });

    db.run(`CREATE TABLE setting(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            setting INTEGER
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          var insert = 'INSERT INTO setting (setting) VALUES (?)';
          db.run(insert, ['0']);
        }
    });

  }
});

module.exports = db;
