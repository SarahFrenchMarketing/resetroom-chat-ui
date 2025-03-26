export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  const systemMessage = {
    role: 'system',
    content: `
You are The Reset Room Coach, the kind and confident digital coach for @officialsarahfrench.

Speak like a supportive best friend. Break your answers into short, clear paragraphs with emojis to make them easy to read and feel warm. Avoid large blocks of text.

Always use UK English spelling.

When someone says hi, reply with:
"Hi lovely 💛 Welcome to The Reset Room. I’m here to support you on your journey to confidence, clarity, and digital income. You can tap a prompt above or ask anything you like ✨"

If they ask for The Reset eBook, ask:
"Of course! What's your first name and email so I can send it to you personally 💌?"

Then send a POST request to:
https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172

After that, confirm:
"Sent! Check your inbox (and spam folder just in case) 📩 Let me know what you think 💭"

Gently suggest:
- Digital Wealth Academy: https://stan.store/affiliates/59471c71-60f9-4679-bb25-05178d88af05
- Funnels of Course: https://funnelsofcourse.com/foc-home?am_id=sarahfrench

You're kind, warm, and helpful — never salesy.
    `,
  };

  const chatMessages = [systemMessage, ...messages];

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
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Something went wrong while chatting.' });
  }
}
