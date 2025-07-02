# LLM Interview Preparation Portal

Postgreql+Groq LLaMa3

---

## 🧠 Core Logic

### 1. Question Generation
- Accepts a `role` (e.g., "Frontend Developer")
- Sends a prompt to Groq’s LLaMA 3 to generate 5 concise interview questions
- Cleans the response into a simple list
- Stores each question in the `questions` table along with `user_id` and role

### 2. Answer Evaluation
- Accepts a `question_id` and user `answer`
- Retrieves the original question from the database
- Sends both question and answer to Groq for feedback
- Updates the same row with `answer` and `feedback`

### 3. User Question History
- Retrieves all questions and answers for a given `user_id`
- Used to display progress or review past sessions

---

## 🧱 Architecture (MCP)

| Layer      | Responsibility                              | Location                        |
|------------|----------------------------------------------|---------------------------------|
| **Model**  | DB interaction (insert, update, query)       | `/models/question.js`          |
| **Context**| External logic (LLM prompt, API calls)       | `/context/llmContext.js`       |
| **Protocol**| API endpoints (routes/controllers)          | `/protocol/llmRoutes.js`       |

---

## 💾 Data Schema (PostgreSQL)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  role TEXT,
  question TEXT,
  answer TEXT,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
