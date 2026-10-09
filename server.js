require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ==========================================
// GROK API HELPER
// ==========================================
async function callGroq(messages) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === 'your_groq_api_key_here') {
        throw new Error('GROQ_API_KEY not configured');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024
        })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Groq API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// ==========================================
// GENERATE NEXT QUESTION
// ==========================================
app.post('/api/generate-question', async (req, res) => {
    try {
        const { profession, previousQA, questionNumber, totalQuestions } = req.body;

        const systemPrompt = `You are an AI Career Explorer Assistant.

Your task is to guide a ${profession} toward a suitable technology career by asking a sequence of simple questions.

The user may not have much knowledge about technology, programming, or technical terms.

Follow these rules strictly:
1. Ask questions using simple everyday language.
2. Avoid technical jargon such as algorithms, APIs, neural networks, or database indexing.
3. Each question must have exactly 4 options.
4. Each option should describe an activity or preference instead of a job title.
5. Keep the conversation friendly and conversational, like a chatbot.
6. Use emojis to make the interaction engaging.
7. Gradually narrow down the user's interests based on previous answers.
8. Questions should relate to real-world activities such as:
   - working with data
   - designing apps or websites
   - building systems behind applications
   - protecting digital systems
   - improving performance
   - creating intelligent tools
9. This is question ${questionNumber} of ${totalQuestions} total. Each question must be DIFFERENT from previous ones.

The available technology careers include:
Data Scientist, Data Engineer, Backend Developer, Frontend Developer, Machine Learning Engineer, Cybersecurity Analyst, Cloud Engineer, DevOps Engineer, UI/UX Designer, Product Manager

Each question should follow this format:
Question:
<simple beginner-friendly question>

Options:
A) <activity description with emoji>
B) <activity description with emoji>
C) <activity description with emoji>
D) <activity description with emoji>

Do not mention the career names in the options.

RESPONSE FORMAT (strict JSON only, no markdown, no code fences):
{
  "question": "Your simple beginner-friendly question?",
  "options": [
    "A) <activity description with emoji>",
    "B) <activity description with emoji>", 
    "C) <activity description with emoji>",
    "D) <activity description with emoji>"
  ]
}`;

        const userContext = previousQA && previousQA.length > 0
            ? `Previous questions and answers:\n${previousQA.map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer}`).join('\n\n')}\n\nGenerate the next question that adapts based on these previous answers.`
            : `Generate the first career discovery question for a ${profession}.`;

        const result = await callGroq([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContext }
        ]);

        // Parse JSON from response (handle potential markdown fences)
        let parsed;
        try {
            const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsed = JSON.parse(cleaned);
        } catch (e) {
            console.error('Failed to parse Grok response:', result);
            throw new Error('Invalid response format from Grok');
        }

        res.json(parsed);
    } catch (error) {
        console.error('Generate question error:', error.message);
        res.status(500).json({ error: error.message, fallback: true });
    }
});

// ==========================================
// ANALYZE CAREER
// ==========================================
app.post('/api/analyze-career', async (req, res) => {
    try {
        const { profession, allQA } = req.body;

        const systemPrompt = `You are an AI Career Advisor. Based on the user's profession and their quiz answers, recommend the SINGLE BEST tech career path.

The user is a: ${profession}

Choose from EXACTLY one of these career IDs:
- data-scientist
- data-engineer
- backend-developer
- frontend-developer
- ml-engineer
- cybersecurity-analyst
- cloud-engineer
- devops-engineer
- ui-ux-designer
- product-manager

RESPONSE FORMAT (strict JSON only, no markdown, no code fences):
{
  "careerId": "one-of-the-ids-above",
  "matchReason": "A short 1-2 sentence explanation of why this career matches the user's interests and profile"
}`;

        const qaText = allQA.map((qa, i) => `Q${i + 1}: ${qa.question}\nA${i + 1}: ${qa.answer}`).join('\n\n');

        const result = await callGroq([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Here are the user's quiz responses:\n\n${qaText}\n\nAnalyze and recommend the best career.` }
        ]);

        let parsed;
        try {
            const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsed = JSON.parse(cleaned);
        } catch (e) {
            console.error('Failed to parse Grok analysis:', result);
            throw new Error('Invalid response format from Grok');
        }

        res.json(parsed);
    } catch (error) {
        console.error('Analyze career error:', error.message);
        res.status(500).json({ error: error.message, fallback: true });
    }
});

// ==========================================
// HEALTH CHECK
// ==========================================
app.get('/api/health', (req, res) => {
    const hasKey = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here';
    res.json({ status: 'ok', grokConfigured: hasKey });
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
    const hasKey = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here';
    console.log(`\n🚀 PathPilot server running at http://localhost:${PORT}`);
    if (!hasKey) {
        console.log('⚠️  GROQ_API_KEY not set in .env — will use fallback questions');
    } else {
        console.log('✅ Groq API key configured');
    }
});
