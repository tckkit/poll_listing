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

const getAnswers = async (poll_id) => {
  const [rows] = await pool.query(
    `
    SELECT answer.id, label 
    FROM 
    answer
    WHERE answer.poll_id = ?
    `,
    [poll_id]
  );

  return rows;
};

const getPollVotes = async (answer_id) => {
  const [rows] = await pool.query(
    `
    SELECT COUNT(*)
    FROM 
    voteAnswer
    WHERE answer_id = ?
    `,
    [answer_id]
  );
  return rows[0]["COUNT(*)"];
};

const getAllPolls = async () => {
  const [polls] = await pool.execute(
    `
    SELECT id, title, type, published_date
    FROM poll
    `
  );

  return polls;
};

const getPoll = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT id, title, type, published_date
    FROM 
    poll
    WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

export { getAllPolls, getAnswers, getPoll, getPollVotes };
