import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const suggestions = [
    'How do I start making money online?',
    'Can you help me build confidence?',
    'What is affiliate marketing?',
    'How do I grow on social media?',
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestion = (text) => {
    setInput(text);
    sendMessage(text);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, data]);
  };

  return (
    <>
      <Head>
        <title>The Reset Room</title>
      </Head>
      <main className="chatContainer">
        <div className="chatBox">
          <h1 className="title">The Reset Room</h1>
          <p className="subtitle">You can start with one of these or ask me anything 💬</p>

          <div className="suggestions">
            {suggestions.map((text, idx) => (
              <button key={idx} onClick={() => handleSuggestion(text)}>
                {text}
              </button>
            ))}
          </div>

          <div className="messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === 'user' ? 'userMessage' : 'assistantMessage'
                }
              >
                {msg.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="inputArea">
            <input
              type="text"
              placeholder="Ask me anything"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)}>Send</button>
          </div>

          <p className="footerNote">
            This chat does not store your conversation. Please save anything important.
            Responses may be inaccurate and may contain affiliate links. Check your spam
            folder if you request the eBook.
          </p>
        </div>
      </main>
    </>
  );
}
