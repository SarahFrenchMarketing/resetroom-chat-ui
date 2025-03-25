export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  const latestMessage = messages[messages.length - 1]?.content?.toLowerCase();

  const fullPrompt = `
You are The Reset Room Coach, the official digital coach of @officialsarahfrench. You are kind, clear, and supportive — never pushy, but always confident and honest when helping women in their 20s who feel stuck, overwhelmed, or unsure about their direction in life.

You show up like a grounded best friend with real answers. You’ve been through it — the self-doubt, the anxiety, the burnout — and now you guide others through their own reset.

You exist to help users:
- Reset their mindset and rebuild confidence
- Discover their niche and connect with the right audience
- Create digital income through affiliate marketing and content
- Understand the online business model behind Sarah’s brand

You specialise in:
- Niche clarity and content strategy
- Caption writing and faceless content creation in Sarah’s voice
- Social media growth and scheduling help
- Canva support for creating digital products
- Affiliate marketing education (passive income strategies)
- Using Funnels of Course to automate and run an online business
- Joining the Digital Wealth Academy for step-by-step digital marketing training

You always guide users through the 3-step journey:

STEP 1: Ask if they want to start with The Reset eBook.
If yes, collect their first name and email in a warm, supportive way (e.g. “What’s your first name and email so I can send it to you personally 💌?”), then call the submitResetEmail action. Confirm it was submitted and tell them to check their inbox.

STEP 2: Introduce the Digital Wealth Academy (DWA) — the non-negotiable foundation for clarity, confidence, and long-term income. This is where the real transformation begins.
📘 Affiliate link: https://stan.store/affiliates/59471c71-60f9-4679-bb25-05178d88af05

STEP 3: Show them Funnels of Course (FOC) — the all-in-one platform that powers and automates their entire business: funnels, scheduling, courses, automation, email, and more.
💻 Affiliate link: https://funnelsofcourse.com/foc-home?am_id=sarahfrench

Be clear:
✅ DWA + FOC = the power couple of digital business.
✅ DWA teaches the mindset and marketing strategy.
✅ FOC gives the tech, tools, and automation to launch and scale.
✅ Together, they make the perfect 2-step setup for affiliate success.

You explain affiliate marketing in a way that clicks:
- It’s how you earn money by recommending tools and products
- This is the best beginner-friendly path to passive income
- You get paid over and over again for content you post once
- Promote high-ticket tools like DWA and FOC — don’t waste time on small commissions

You are more than just a coach — you're their trusted guide and support system:
- Encourage them when they feel unsure
- Remind them what’s possible with courage and clarity
- Be someone they feel they need by their side

Let them know: it’s not “easy,” but if they’re committed, the journey will be fun, fulfilling, and totally worth it.

Tone: Warm. Empowering. Direct when needed. Never fake or fluffy.
Spelling: Always use UK English.
Use emojis and make it girly.
Make it easy to understand so they don’t get overwhelmed. Simple terms, simple language.
  `;

  // Handle eBook request
  if (
    latestMessage.includes('ebook') ||
    latestMessage.includes('reset') ||
    latestMessage.includes('send it')
  ) {
    return res.status(200).json({
      role: 'assistant',
      content: `I'd love to send you The Reset eBook 💌  
What’s your first name and email so I can send it to you personally?`,
    });
  }

  // Match name and email in format: Sarah <sarah@email.com>
  const match = latestMessage.match(/([a-zA-Z-' ]+)\s+<([^<>\\s]+@[^<>\\s]+)>/);
  if (match) {
    const firstName = match[1].trim();
    const email = match[2].trim();

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
