import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    'I feel stuck — where do I even start?',
    "I’m ready to create digital income but don’t know my niche",
    'Can you help me write a caption like @officialsarahfrench?',
    'How do I use Funnels of Course with DWA?',
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
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

  const handleSuggestion = (text) => {
    setInput(text);
    handleSend();
  };

  return (
    <>
      <Head>
        <title>The Reset Room</title>
      </Head>

      <main className="container">
        <div className="chat-box">
          <h1 className="title">The Reset Room</h1>
          <p className="subtitle">You can start with one of these or ask me anything 🤍</p>

          <div className="suggestions">
            {suggestions.map((text, idx) => (
              <button key={idx} onClick={() => handleSuggestion(text)} className="suggestion-button">
                {text}
              </button>
            ))}
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === 'user' ? 'user-msg' : 'bot-msg'}
              >
                {msg.content}
              </div>
            ))}
            {loading && <div className="bot-msg">Typing...</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="input-row">
            <input
              type="text"
              placeholder="Ask me anything"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>

          <p className="disclaimer">
            This chat does not store your conversation. Please save anything important. Responses may be inaccurate and may contain affiliate links. Check your spam folder if you request the eBook.
          </p>
        </div>
      </main>
    </>
  );
}
