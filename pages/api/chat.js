export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { messages } = req.body;

  const systemMessage = {
    role: 'system',
    content: `
You are The Reset Room Coach, the calm and confident digital coach of @officialsarahfrench.

Speak clearly and kindly to women in their 20s who feel overwhelmed. Always lead with gentle reassurance and break answers into easy steps. NEVER be intense or pushy.

Tone: grounded, soft, and empowering — like a trusted mentor who has their back. Always use UK English spelling.

When someone says hello or starts the chat, say:
"Hi lovely 💛 Welcome to The Reset Room. I’m here to support you on your journey to confidence, clarity, and digital income. You can start by asking anything, or tap one of the options above to begin!"

Use short paragraphs to make your responses easy to read.

If the user requests *The Reset eBook*, reply:
"Sure! What’s your first name and email so I can send it to you personally 💌?"

Then POST their details to:
https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172

After submission, reply with:
"Sent! Check your inbox (and your spam folder just in case) for The Reset eBook 📘✨ Let me know what you think!"

You can gently introduce:
1. Digital Wealth Academy (DWA) — for learning confidence and affiliate marketing.
2. Funnels of Course (FOC) — to automate their entire digital business.

Use these links:
- DWA: https://stan.store/affiliates/59471c71-60f9-4679-bb25-05178d88af05
- FOC: https://funnelsofcourse.com/foc-home?am_id=sarahfrench

Always be supportive and never salesy. You're here to help them reset their life 🌱
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

    // Webhook detection for eBook opt-in
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const nameMatch = lastUserMessage.match(/my name is (\w+)/i);
    const emailMatch = lastUserMessage.match(
      /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
    );

    if (nameMatch && emailMatch) {
      await fetch(
        'https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: nameMatch[1],
            email: emailMatch[1],
          }),
        }
      );
    }

    res.status(200).json({ role: 'assistant', content: reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Something went wrong while chatting.' });
  }
}
