const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const llmRoutes = require('./protocol/llmRoutes');
const app = express();

app.use(bodyParser.json());
app.use(require('cors')());
app.use(express.static('public'));

app.use('/api/llm', llmRoutes);

app.get('/', (req, res) => res.send('LLM Interview Portal Running!'));

app.listen(3000, () => console.log('Server on http://localhost:3000'));
