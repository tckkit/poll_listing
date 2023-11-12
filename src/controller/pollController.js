import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

const createVote = async (poll_id, answers) => {
  const [res] = await pool.query(
    `
    INSERT INTO vote
    (poll_id)
    VALUES (?);
    `,
    [poll_id]
  );
  const vote_id = res.insertId;
  for (const answer_id of answers) {
    await pool.query(
      `
      INSERT INTO voteAnswer
      (vote_id, answer_id)
      VALUES (?, ?);
      `,
      [vote_id, answer_id]
    );
  }
  return { result: "success" };
};

export { createVote };
