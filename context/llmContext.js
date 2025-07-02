const axios = require('axios');
require('dotenv').config();

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const headers = {
  'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
  'Content-Type': 'application/json'
};

exports.generateQuestions = async (role) => {
    const res = await axios.post(GROQ_URL, {
      model: 'llama3-70b-8192',
      messages: [
        {
          role: 'user',
          content: `Generate 5 concise, standalone technical interview questions for a ${role} role.
  Only return the questions as a numbered list. Do not include explanations, follow-ups, or additional context. Just give questions only, nothing else. not even things like this Here are 5 concise technical interview questions for a frontend developer role:

`
        }
      ],
      temperature: 0.5
    }, { headers });
  
    // Split and clean up
    return res.data.choices[0].message.content
      .split(/\n/)
      .map(line => line.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean);
  };
  

exports.evaluateAnswer = async (question, answer) => {
  const res = await axios.post(GROQ_URL, {
    model: 'llama3-70b-8192',
    messages: [
      { role: 'system', content: 'You are an interviewer evaluating answers.' },
      { role: 'user', content: `Question: ${question}\nAnswer: ${answer}\nGive short constructive feedback.` }
    ],
    temperature: 0.5
  }, { headers });

  return res.data.choices[0].message.content;
};
