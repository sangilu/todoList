const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "next1234!",
  database: "reactdb",
  port: 3306,
});

module.exports = pool;

async function transaction(callback) {
  //연결풀에서 커넥션 가져오기
  const connection = await pool.getConnection();
  try {
    //트랜잭션 시작
    await connection.beginTransaction();
    //콜백함수로 실행결과 받기
    const result = await callback(connection);
    //트랜잭션 커밋
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    //풀에 다시 반환
    connection.release();
  }
}

module.exports = {
  query: (sql, params) => pool.query(sql, params),
  transaction,
};
