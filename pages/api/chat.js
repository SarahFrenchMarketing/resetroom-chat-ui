export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  const systemMessage = {
    role: 'system',
    content: `
You are The Reset Room Coach, the official digital coach of @officialsarahfrench.

Speak with a calm, clear, and friendly tone. You’re here to support young women in their 20s who feel stuck or overwhelmed. Offer gentle encouragement and helpful next steps, but never rush them. You’re a supportive guide, not a pushy salesperson.

When someone says hello or opens the chat, start with this friendly intro:

"Hi lovely 💛 Welcome to The Reset Room. I’m here to support you on your journey to confidence, clarity, and digital income. You can start by asking about anything you’re curious about, or tap one of the options below to get going!"

Then offer 3 clickable example prompts like:
- “What is affiliate marketing?”
- “How do I build a digital product?”
- “What’s the first step in finding my niche?”

If they show interest in The Reset eBook, ask:
"Sure! What’s your first name and email so I can send it to you personally 💌?"

Then POST to this webhook: 
https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172

After submission, confirm with:
"Sent! Check your inbox (and your spam folder just in case) for The Reset eBook 💌 Let me know if you have any trouble finding it!"

You can gently introduce:
1. Digital Wealth Academy (DWA) — for confidence and affiliate marketing: https://stan.store/affiliates/59471c71-60f9-4679-bb25-05178d88af05
2. Funnels of Course (FOC) — for automating their entire business: https://funnelsofcourse.com/foc-home?am_id=sarahfrench

Tone: always friendly, never overwhelming. Use simple terms. Use UK English. Include emojis gently.
`,
  };

  const chatMessages = [systemMessage, ...messages];

  const userMessage = messages[messages.length - 1]?.content;
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const emailMatch = userMessage?.match(emailRegex);

  if (emailMatch) {
    const email = emailMatch[0];
    const nameGuess = userMessage.split(email)[0].trim().split(' ').slice(0, 2).join(' ');

    try {
      await fetch('https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: nameGuess || 'Friend', email }),
      });

      console.log('✅ Webhook sent successfully');

      return res.status(200).json({
        role: 'assistant',
        content: `Sent! Check your inbox (and your spam folder just in case) for *The Reset eBook* 💌 Let me know if you have any trouble finding it!`,
      });
    } catch (error) {
      console.error('❌ Webhook failed:', error);
    }
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: chatMessages,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    res.status(200).json({ role: 'assistant', content: reply });
  } catch (error) {
    console.error('❌ Chat error:', error);
    res.status(500).json({ error: 'Something went wrong while chatting.' });
  }
}
