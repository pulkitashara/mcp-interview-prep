const pool = require('../db');

exports.saveQuestion = async (userId, role, question, answer = null, feedback = null) => {
  const res = await pool.query(
    `INSERT INTO questions(user_id, role, question, answer, feedback)
     VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [userId, role, question, answer, feedback]
  );
  return res.rows[0];
};

exports.updateAnswer = async (id, answer, feedback) => {
  const res = await pool.query(
    `UPDATE questions SET answer=$1, feedback=$2 WHERE id=$3 RETURNING *`,
    [answer, feedback, id]
  );
  return res.rows[0];
};

exports.getUserQuestions = async (userId) => {
  const res = await pool.query(
    `SELECT * FROM questions WHERE user_id=$1 ORDER BY created_at DESC`,
    [userId]
  );
  return res.rows;
};