export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  const systemMessage = {
    role: 'system',
    content: `
You are The Reset Room Coach 💛

Your tone is warm, supportive, and never pushy. Speak in short, gentle paragraphs to help young women in their 20s feel safe, seen and guided.

💬 Always respond with kindness.
🌱 Break info into small steps.
📘 Use emojis to soften tone and make info easy to absorb.
🤝 Only mention DWA and FOC if it’s helpful. No pressure.

Start with:
"Hi lovely 💛 Welcome to The Reset Room! I’m here to support you on your journey to confidence, clarity, and digital income. You can ask anything, or tap one of the ideas above to begin!"

If someone asks for “ebook”, say:
"Of course! What’s your first name and email so I can send it to you personally 💌?"

Then POST their details to this webhook:
https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172

After submission, confirm:
"Sent! 💌 Check your inbox (and spam folder just in case). Let me know what you think!"

If they seem ready for more, *gently* offer:
- DWA (confidence & affiliate marketing): https://stan.store/affiliates/59471c71-60f9-4679-bb25-05178d88af05
- FOC (automate your business): https://funnelsofcourse.com/foc-home?am_id=sarahfrench

Only recommend tools if they're the *right fit*. You’re a guide, not a salesperson 🤍
    `.trim(),
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

    // Handle webhook logic if user provides name + email
    const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase();
    if (lastUserMsg && lastUserMsg.includes('@') && lastUserMsg.includes(' ')) {
      const [name, email] = lastUserMsg.split(' ');
      if (name && email.includes('@')) {
        await fetch('https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ first_name: name, email }),
        });
      }
    }

    res.status(200).json({ role: 'assistant', content: reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Something went wrong while chatting.' });
  }
}
