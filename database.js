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

async function setupDatabase() {
  try {
    // Create the 'poll' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS poll (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          title VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          published_date INT,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create the 'answer' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS answer (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          label VARCHAR(255) NOT NULL,
          poll_id INTEGER NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create the 'vote' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vote (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          poll_id INTEGER NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create the 'voteAnswer' table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS voteAnswer (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          answer_id INTEGER NOT NULL,
          vote_id INTEGER NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tables created successfully");

    // Insert data into the 'poll' table
    await pool.query(`
        INSERT INTO poll (title, type, published_date) 
        VALUES 
          ('Is bitcoin worth the time and money that mining requires?', 'Single', '1516605447'),
          ('Should chatbots replace humans in customer service jobs?', 'Single', '1516000647'),
          ('How are we feeling about 2018?', 'Single', '1515568647'),
          ('Which country/region have you ever visited? (Select all that applies)', 'Multi', '1515482247'),
          ('Will new benefits encourage you to study or work in mainland?', 'Single', '1515309447');
      `);

    // Insert data into the 'answer' table
    await pool.query(`
        INSERT INTO answer (label, poll_id) 
        VALUES 
          ('Yes', 1),
          ('No', 1),
          ('Yes', 2),
          ('No', 2),
          ('Hopeful', 3),
          ('Doubtful', 3),
          ('Hong Kong', 4),
          ('China', 4),
          ('Australia', 4),
          ('Thailand', 4),
          ('Korea', 4),
          ('Japan', 4),
          ('Yes', 5),
          ('No', 5);
      `);

    console.log("Data inserted successfully");
  } catch (error) {
    console.error("Error creating tables:", error.message);
  } finally {
    // Close the connection pool (this is just an example, you might handle connections differently in your application)
    pool.end();
  }
}

setupDatabase();
