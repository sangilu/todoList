const express = require("express");
const db = require("../../database");
const router = express.Router();

router.get("/user", async (req, res) => {
  const { no } = req.query;
  console.log(no);
  const getUser = `SELECT user_id, user_name FROM users WHERE user_no = ?`;
  const [getUsers] = await db.query(getUser, [no]);
  console.log(getUsers);
  if (getUsers.length > 0) {
    res.status(201).json({ success: true, info: getUsers[0] });
  } else {
    res.status(201).json({ success: false });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const duplicateIdQuery = `SELECT * FROM users WHERE user_id = ?`;
    const [duplicateIdRows] = await db.query(duplicateIdQuery, [userId]);

    if (duplicateIdRows.length > 0) {
      res.status(200).json({ duplicate: true });
    } else {
      res.status(200).json({ duplicate: false });
    }
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/addUser", async (req, res) => {
  const { id, pw, name } = req.body;

  const query = `INSERT INTO users (user_id, user_pw, user_name, create_date, modify_date)
                 VALUES(?, ?, ?, now(), now())`;
  try {
    const [result] = await db.query(query, [id, pw, name]);
    if (result.affectedRows > 0) {
      res.status(201).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { id, pw } = req.body;

  const query = `SELECT user_no FROM users WHERE user_id = ? AND user_pw = ?`;
  try {
    const [result] = await db.query(query, [id, pw]);
    console.log(result.length);
    if (result.length > 0) {
      res.status(200).json({ success: true, userno: result[0].user_no });
    } else {
      res.status(201).json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

// //트랜잭션
// router.post("/editUser", async (req, res) => {
//   const { userId } = req.body;

//   await db.transaction(async (conn) => {
//     //1. insert 쿼리 날리기
//     const query = `INSERT INTO users (user_id, user_pw, user_name,create_date, modify_date)
//                    VALUES(?, '123', '사용자테스트',now(),now())
//                   `;
//     const result = await conn.query(query, [userId]);
//     console.log(result);

//     //2. update 쿼리 날리기
//     const query2 = `UPDATE users
//                     SET user_name = '테스트'
//                     WHERE user_id = ?
//                     `;
//     const result2 = await conn.query(query, [userId]);
//     console.log(result2);
//   });
// });

module.exports = router;
