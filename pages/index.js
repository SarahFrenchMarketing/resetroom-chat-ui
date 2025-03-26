import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    "I feel stuck — where do I even start?",
    "I’m ready to create digital income but don’t know my niche",
    "Can you help me write a caption like @officialsarahfrench?",
    "How do I use Funnels of Course with DWA?"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  return (
    <>
      <Head>
        <title>The Reset Room</title>
      </Head>
      <main className="chat-wrapper">
        <h1>The Reset Room</h1>
        <p className="subtitle">You can start with one of these or ask me anything 💬</p>

        <div className="suggestions">
          {suggestions.map((text, idx) => (
            <button key={idx} onClick={() => handleSuggestion(text)}>
              {text}
            </button>
          ))}
        </div>

        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className="message">
              {msg.content}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <form onSubmit={handleSubmit} className="input-area">
          <input
            type="text"
            placeholder="Ask me anything"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>Send</button>
        </form>

        <p className="footer-note">
          This chat does not store your conversation. Please save anything important.
          Responses may be inaccurate and may contain affiliate links. Check your spam
          folder if you request the eBook.
        </p>
      </main>
    </>
  );
}
