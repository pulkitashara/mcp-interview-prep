const express = require('express');
const router = express.Router();
const llm = require('../context/llmContext');
const questions = require('../models/question');

router.post('/generate', async (req, res) => {
  const { role, user_id } = req.body;
  const generated = await llm.generateQuestions(role);
  const saved = [];
  for (const q of generated) {
    const row = await questions.saveQuestion(user_id, role, q.trim());
    saved.push(row);
  }
  res.json(saved);
});

router.post('/answer', async (req, res) => {
  const { question_id, answer, user_id } = req.body;
  const qList = await questions.getUserQuestions(user_id);
  const question = qList.find(q => q.id === question_id)?.question;
  const feedback = await llm.evaluateAnswer(question, answer);
  const updated = await questions.updateAnswer(question_id, answer, feedback);
  res.json(updated);
});

router.get('/history/:userId', async (req, res) => {
  const data = await questions.getUserQuestions(req.params.userId);
  res.json(data);
});

module.exports = router;