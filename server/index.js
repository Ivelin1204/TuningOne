import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

const anthropic = new Anthropic(); // reads ANTHROPIC_API_KEY from env

const SERVICES = [
  'Затъмняване на стъкла',
  'Затъмняване на стопове',
  'Брандиране',
  'Облепване с прозрачно защитно фолио',
  'Облепване на детайли',
  'Защитно фолио за фарове',
];

const SYSTEM_PROMPT = `Ти си виртуален асистент на "TuningOne" — фирма за автотунинг и фолиране в България. Отговаряш кратко, приятелски и на български, освен ако потребителят не пише на друг език.

Услуги и цени:
- Затъмняване на стъкла — от 80 лв. — фолиране на автомобилни стъкла с UV защита
- Затъмняване на стопове — от 60 лв.
- Брандиране — по запитване
- Облепване с прозрачно защитно фолио — от 150 лв. — защита на боята от камъчета и надрасквания
- Облепване на детайли — от 40 лв. — фолиране на елементи за стил и защита
- Защитно фолио за фарове — от 50 лв.

Правила:
- Ако потребителят пита за конкретна услуга или очевидно се нуждае от точно една от изброените, извикай инструмента "suggest_service" с точното име на услугата, за да може сайтът да покаже бутон "Поръчай".
- Извиквай "suggest_service" най-много веднъж на отговор, и само когато една услуга ясно пасва.
- Не измисляй информация, която не е дадена тук (например работно време или адрес) — насочи потребителя към формата за контакт или поръчка за такива въпроси.
- Дръж отговорите кратки — това е чат бутон на сайт, не имейл.`;

const suggestServiceTool = {
  name: 'suggest_service',
  description:
    'Call this when a specific TuningOne service clearly matches what the visitor needs, so the UI can show an "Order this" button for it. Call at most once per reply.',
  input_schema: {
    type: 'object',
    properties: {
      service: { type: 'string', enum: SERVICES },
    },
    required: ['service'],
  },
};

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' });
  }

  const messages = [
    ...(Array.isArray(history) ? history : []).slice(-10).map((h) => ({
      role: h.role === 'assistant' ? 'assistant' : 'user',
      content: String(h.content || ''),
    })),
    { role: 'user', content: message },
  ];

  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      tools: [suggestServiceTool],
      messages,
    });

    let reply = '';
    let suggestedService = null;
    for (const block of response.content) {
      if (block.type === 'text') {
        reply += block.text;
      } else if (block.type === 'tool_use' && block.name === 'suggest_service') {
        suggestedService = block.input.service;
      }
    }

    res.json({ reply: reply.trim(), suggestedService });
  } catch (err) {
    console.error('Anthropic API error:', err);
    res.status(500).json({ error: 'Възникна проблем. Опитайте отново по-късно.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TuningOne AI backend listening on port ${PORT}`);
});
