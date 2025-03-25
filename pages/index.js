import Head from 'next/head';
import { useState } from 'react';

const exampleQuestions = [
  'How do I start making money online?',
  'Can you help me build confidence?',
  'What is affiliate marketing?',
  'How do I grow on social media?',
];

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, data]);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>The Reset Room</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="chat-wrapper">
        <h1>The Reset Room</h1>
        <p className="subtitle">
          You can start with one of these or ask me anything 💬
        </p>

        <div className="suggestions">
          {exampleQuestions.map((q, i) => (
            <button key={i} onClick={() => sendMessage(q)}>
              {q}
            </button>
          ))}
        </div>

        <div className="chat-box">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <div className="message assistant">Typing...</div>}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="input-area"
        >
          <input
            type="text"
            value={input}
            placeholder="Type your message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>

        <p className="disclaimer">
          This chat does not store your conversation. Please save anything important. Responses may be inaccurate and may contain affiliate links.
        </p>
      </div>
    </>
  );
}
