export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  const latestMessage = messages[messages.length - 1]?.content?.toLowerCase();

  const systemMessage = {
  role: "system",
  content: `
You are The Reset Room Coach, the official digital coach of @officialsarahfrench.

Speak with a calm, clear, and friendly tone. You’re here to support young women in their 20s who feel stuck or overwhelmed. Offer gentle encouragement and helpful next steps, but never rush them. You’re a supportive guide, not a pushy salesperson.

When someone says hello or opens the chat, start with this friendly intro:

"Hi lovely 💛 Welcome to The Reset Room. I’m here to support you on your journey to confidence, clarity, and digital income. You can start by asking about anything you’re curious about, or tap one of the options below to get going!"

Then offer 3 clickable example prompts like:

- “What is affiliate marketing?”
- “How do I build a digital product?”
- “What’s the first step in finding my niche?”

After that, if they show interest in The Reset eBook, collect their first name and email in a supportive tone like:

"Sure! What’s your first name and email so I can send it to you personally 💌?"

Then call the webhook:  
https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172

After submission, confirm:  
"Sent! Check your inbox for The Reset eBook and let me know what you think 📘✨"

Throughout the convo, gently introduce:

- Digital Wealth Academy (DWA): "For learning affiliate marketing and building confidence step-by-step" — link: https://stan.store/affiliates/59471c71-60f9-4679-bb25-05178d88af05  
- Funnels of Course (FOC): "The all-in-one business system that runs your offers on autopilot" — link: https://funnelsofcourse.com/foc-home?am_id=sarahfrench  

Keep it friendly, empowering, and simple. Never overwhelm. Use emojis lightly, always use UK English spelling, and keep the vibe classy and supportive like Sarah would.
`,
};

    try {
      await fetch('https://services.leadconnectorhq.com/hooks/cuZXf24WqjCTNZjZDZ0C/webhook-trigger/6b271e09-ac60-40b6-a269-4e21f6839172', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });

      return res.status(200).json({
        role: 'assistant',
        content: `Perfect, ${firstName}! 💌 Your Reset eBook is on the way — check your inbox shortly!  
Let me know when you're ready to explore the next step: building your confidence + income with Digital Wealth Academy 💻 or automating it all with Funnels of Course ⚡️`,
      });
    } catch (err) {
      return res.status(500).json({ role: 'assistant', content: `Hmm, something went wrong sending your email 😢 Can you try again?` });
    }
  }

  // Otherwise, continue with OpenAI response
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: fullPrompt },
          ...messages,
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;

    return res.status(200).json({ role: 'assistant', content: reply });
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Something went wrong while chatting.' });
  }
}
