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
          db.run(insert, ['Admin', 'admin@gumiviet.com', 'male', md5('password'), 'images/user/admin.jpg']);
          db.run(insert, ['Gerard', 'nhatnguyen.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Gerard.JPG']);
          db.run(insert, ['Alice', 'thanhtrung.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Alice.JPG']);
          db.run(insert, ['Ant', 'thangnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Ant.JPG']);
          db.run(insert, ['Anthony', 'hoangtuan.tran@gumiviet.com', 'male', md5('password'), 'images/user/Anthony.JPG']);
          db.run(insert, ['Baku', 'bac.pham@gumiviet.com', 'male', md5('password'), 'images/user/Baku.JPG']);
          db.run(insert, ['Ban', 'van.tran@gumiviet.com', 'male', md5('password'), 'images/user/Ban.JPG']);
          db.run(insert, ['Betto', 'vietnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Betto.JPG']);
          db.run(insert, ['Bill', 'my.luu@gumiviet.com', 'male', md5('password'), 'images/user/Bill.JPG']);
          db.run(insert, ['Bruce', 'long.ly@gumiviet.com', 'male', md5('password'), 'images/user/Bruce.JPG']);
          db.run(insert, ['Chain', 'tin.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Chain.JPG']);
          db.run(insert, ['Chris', 'thanh.vo@gumiviet.com', 'male', md5('password'), 'images/user/Chris.JPG']);
          db.run(insert, ['Dahi', 'dangnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Dahi.JPG']);
          db.run(insert, ['Dan', 'my.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Dan.JPG']);
          db.run(insert, ['Daniel', 'toan.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Daniel.JPG']);
          db.run(insert, ['David', 'anh.pham@gumiviet.com', 'male', md5('password'), 'images/user/David.JPG']);
          db.run(insert, ['Eagle', 'conghan.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Eagle.JPG']);
          db.run(insert, ['Edmund', 'ducchinh.phung@gumiviet.com', 'male', md5('password'), 'images/user/Edmund.JPG']);
          db.run(insert, ['Eric', 'toanpham@gumiviet.com', 'male', md5('password'), 'images/user/Eric.JPG']);
          db.run(insert, ['Fuku', 'phuchuynh@gumiviet.com', 'male', md5('password'), 'images/user/Fuku.JPG']);
          db.run(insert, ['Gary', 'khoa.thai@gumiviet.com', 'male', md5('password'), 'images/user/Gary.JPG']);
          db.run(insert, ['Gin', 'tai.huynh@gumiviet.com', 'male', md5('password'), 'images/user/Gin.JPG']);
          db.run(insert, ['Hugh', 'hieu.tran@gumiviet.com', 'male', md5('password'), 'images/user/Hugh.JPG']);
          db.run(insert, ['Izumin', 'izumin.trung@gumiviet.com', 'male', md5('password'), 'images/user/Izumin.JPG']);
          db.run(insert, ['Jaian', 'anle.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Jaian.JPG']);
          db.run(insert, ['Zed', 'thuan.vu@gumiviet.com', 'male', md5('password'), 'images/user/Zed.JPG']);
          db.run(insert, ['Jot', 'phuhuy.tran@gumiviet.com', 'male', md5('password'), 'images/user/Jot.JPG']);
          db.run(insert, ['Kai', 'bang.pham@gumiviet.com', 'male', md5('password'), 'images/user/Kai.JPG']);
          db.run(insert, ['Kengo', 'kengo-hayano@gumiviet.com', 'male', md5('password'), 'images/user/Kengo.JPG']);
          db.run(insert, ['Kevin', 'vien.le@gumiviet.com', 'male', md5('password'), 'images/user/Kevin.JPG']);
          db.run(insert, ['Kuro', 'kuro.tuan@gumiviet.com', 'male', md5('password'), 'images/user/Kuro.JPG']);
          db.run(insert, ['Kyle', 'kyle.phu@gumiviet.com', 'male', md5('password'), 'images/user/Kyle.JPG']);
          db.run(insert, ['Leon', 'tuan.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Leon.JPG']);
          db.run(insert, ['Lynk Kyd', 'thai.pham@gumiviet.com', 'male', md5('password'), 'images/user/LynkKyd.JPG']);
          db.run(insert, ['Louis', 'ngocthach.duong@gumiviet.com', 'male', md5('password'), 'images/user/Louis.JPG']);
          db.run(insert, ['Medal', 'chuong.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Medal.JPG']);
          db.run(insert, ['Mido', 'minh.ngo@gumiviet.com', 'male', md5('password'), 'images/user/Mido.JPG']);
          db.run(insert, ['Nova', 'hoa.hoang@gumiviet.com', 'male', md5('password'), 'images/user/Nova.JPG']);
          db.run(insert, ['Otis', 'cong.do@gumiviet.com', 'male', md5('password'), 'images/user/Otis.JPG']);
          db.run(insert, ['Pat', 'dat.le@gumiviet.com', 'male', md5('password'), 'images/user/Pat.JPG']);
          db.run(insert, ['Ricky', 'kien.vu@gumiviet.com', 'male', md5('password'), 'images/user/Ricky.JPG']);
          db.run(insert, ['Riki', 'hoa.le@gumiviet.com', 'male', md5('password'), 'images/user/Riki.JPG']);
          db.run(insert, ['Ryan', 'lan.le@gumiviet.com', 'male', md5('password'), 'images/user/Ryan.JPG']);
          db.run(insert, ['S-One', 'duy.phan@gumiviet.com', 'male', md5('password'), 'images/user/S-One.JPG']);
          db.run(insert, ['Saint', 'son.le@gumiviet.com', 'male', md5('password'), 'images/user/Saint.JPG']);
          db.run(insert, ['Scot', 'hoang.duong@gumiviet.com', 'male', md5('password'), 'images/user/Scot.JPG']);
          db.run(insert, ['Seven', 'son.truong@gumiviet.com', 'male', md5('password'), 'images/user/Seven.JPG']);
          db.run(insert, ['Steve', 'hoangnhan.luu@gumiviet.com', 'male', md5('password'), 'images/user/Steve.JPG']);
          db.run(insert, ['Sugino', 'masanao.sugino@gumiviet.com', 'male', md5('password'), 'images/user/Sugino.JPG']);
          db.run(insert, ['Taho', 'thaonguyen@gumiviet.com', 'male', md5('password'), 'images/user/Taho.JPG']);
          db.run(insert, ['Takeshi', 'takeshi.tuan@gumiviet.com', 'male', md5('password'), 'images/user/Takeshi.JPG']);
          db.run(insert, ['Thirteen', 'huy.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Thirteen.JPG']);
          db.run(insert, ['Thomas', 'tu.doan@gumiviet.com', 'male', md5('password'), 'images/user/Thomas.JPG']);
          db.run(insert, ['Three', 'duy.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Three.JPG']);
          db.run(insert, ['Thu An', 'thuan.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/ThuAn.JPG']);
          db.run(insert, ['Tim', 'nhat.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Tim.JPG']);
          db.run(insert, ['Tivi', 'vule@gumiviet.com', 'male', md5('password'), 'images/user/Tivi.JPG']);
          db.run(insert, ['Tom', 'trungtinh.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Tom.JPG']);
          db.run(insert, ['Tony', 'quan.dinh@gumiviet.com', 'male', md5('password'), 'images/user/Tony.JPG']);
          db.run(insert, ['Trent', 'duc.do@gumiviet.com', 'male', md5('password'), 'images/user/Trent.JPG']);
          db.run(insert, ['Tun', 'tungnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Tun.JPG']);
          db.run(insert, ['Two', 'tu.ta@gumiviet.com', 'male', md5('password'), 'images/user/Two.JPG']);
          db.run(insert, ['Uzumaki', 'viet.dang@gumiviet.com', 'male', md5('password'), 'images/user/Uzumaki.JPG']);
          db.run(insert, ['Vader', 'thinh.trinh@gumiviet.com', 'male', md5('password'), 'images/user/Vader.JPG']);
          db.run(insert, ['Will', 'anhnguyen@gumiviet.com', 'male', md5('password'), 'images/user/Will.JPG']);
          db.run(insert, ['Xin', 'trung.nguyen@gumiviet.com', 'male', md5('password'), 'images/user/Xin.JPG']);
          db.run(insert, ['Huy', 'huy.nguyenphan@gumiviet.com', 'male', md5('password'), 'images/user/Huy.JPG']);
          db.run(insert, ['Irirus', 'irirus.anh@gumiviet.com', 'male', md5('password'), 'images/user/Irirus.JPG']);

          db.run(insert, ['Nini', 'nhipham@gumiviet.com', 'female', md5('password'), 'images/user/Nini.JPG']);
          db.run(insert, ['Aki', 'ngoc.le@gumiviet.com', 'female', md5('password'), 'images/user/Aki.JPG']);
          db.run(insert, ['Alita', 'trinh.thai@gumiviet.com', 'female', md5('password'), 'images/user/Alita.JPG']);
          db.run(insert, ['Amy', 'amy.anh@gumiviet.com', 'female', md5('password'), 'images/user/Amy.JPG']);
          db.run(insert, ['Anise', 'anh.tran@gumiviet.com', 'female', md5('password'), 'images/user/Anise.JPG']);
          db.run(insert, ['Bella', 'ngoclan.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Bella.JPG']);
          db.run(insert, ['Hana', 'hanh.tran@gumiviet.com', 'female', md5('password'), 'images/user/Hana.JPG']);
          db.run(insert, ['Helen', 'nhi.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Helen.JPG']);
          db.run(insert, ['Joey', 'khanh.van@gumiviet.com', 'female', md5('password'), 'images/user/Joey.JPG']);
          db.run(insert, ['Kusa', 'kusa.thao@gumiviet.com', 'female', md5('password'), 'images/user/Kusa.JPG']);
          db.run(insert, ['Mia', 'ngoc.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Mia.JPG']);
          db.run(insert, ['Mimi', 'huyenmy@gumi.co.jp', 'female', md5('password'), 'images/user/Mimi.JPG']);
          db.run(insert, ['Midori', 'nhan.vuong@gumiviet.com', 'female', md5('password'), 'images/user/Midori.JPG']);
          db.run(insert, ['Moon', 'hangbui@gumiviet.com', 'female', md5('password'), 'images/user/Moon.JPG']);
          db.run(insert, ['Naoki', 'xuan.le@gumiviet.com', 'female', md5('password'), 'images/user/Naoki.JPG']);
          db.run(insert, ['Neko', 'dungbui@gumiviet.com', 'female', md5('password'), 'images/user/Neko.JPG']);
          db.run(insert, ['Peace', 'vy.tran@gumiviet.com', 'female', md5('password'), 'images/user/Peace.JPG']);
          db.run(insert, ['Ran', 'nhi.huynh@gumiviet.com', 'female', md5('password'), 'images/user/Ran.JPG']);
          db.run(insert, ['Rei', 'linh.hoang@gumiviet.com', 'female', md5('password'), 'images/user/Rei.JPG']);
          db.run(insert, ['Riri', 'hoa.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Riri.JPG']);
          db.run(insert, ['Rosa', 'van.bui@gumiviet.com', 'female', md5('password'), 'images/user/Rosa.JPG']);
          db.run(insert, ['Runa', 'tram.phan@gumiviet.com', 'female', md5('password'), 'images/user/Runa.JPG']);
          db.run(insert, ['Saly', 'suongphan@gumiviet.com', 'female', md5('password'), 'images/user/Saly.JPG']);
          db.run(insert, ['Sarah', 'thuyntt@gumiviet.com', 'female', md5('password'), 'images/user/Sarah.JPG']);
          db.run(insert, ['Sora', 'ngoctran.tran@gumiviet.com', 'female', md5('password'), 'images/user/Sora.JPG']);
          db.run(insert, ['Sunny', 'duong.tran@gumiviet.com', 'female', md5('password'), 'images/user/Sunny.JPG']);
          db.run(insert, ['Susan', 'suong.tran@gumiviet.com', 'female', md5('password'), 'images/user/Susan.JPG']);
          db.run(insert, ['Tamu', 'tham.nguyen@gumiviet.com', 'female', md5('password'), 'images/user/Tamu.JPG']);
          db.run(insert, ['Tanpopo', 'ngoc.tran@gumiviet.com', 'female', md5('password'), 'images/user/Tanpopo.JPG']);
          db.run(insert, ['Tomo', 'phuong.tran@gumiviet.com', 'female', md5('password'), 'images/user/Tomo.JPG']);
          db.run(insert, ['Umiko', 'nhi.ho@gumiviet.com', 'female', md5('password'), 'images/user/Umiko.JPG']);
          db.run(insert, ['Venus', 'khanh.le@gumiviet.com', 'female', md5('password'), 'images/user/Venus.JPG']);
          db.run(insert, ['Yoko', 'watanabe.yoko@gumiviet.com', 'female', md5('password'), 'images/user/Yoko.JPG']);
          db.run(insert, ['Yoshi', 'anh.vo@gumiviet.com', 'female', md5('password'), 'images/user/Yoshi.JPG']);
          db.run(insert, ['Claire', 'nguyen.bui@gumiviet.com', 'female', md5('password'), 'images/user/Claire.JPG']);
          db.run(insert, ['Clara', 'lien.huynh@gumiviet.com', 'female', md5('password'), 'images/user/Clara.JPG']);
          db.run(insert, ['Tamae', 'phuongpham@gumiviet.com', 'female', md5('password'), 'images/user/Tamae.JPG']);
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

  }
});

module.exports = db;
