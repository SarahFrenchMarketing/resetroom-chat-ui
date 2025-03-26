import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const suggestions = [
    'How do I start making money online?',
    'Can you help me build confidence?',
    'What is affiliate marketing?',
    'How do I grow on social media?'
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, data]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, something went wrong." }]);
    }
  };

  const handleSuggestion = (text) => {
    setInput(text);
  };

  return (
    <>
      <Head>
        <title>The Reset Room</title>
      </Head>
      <main className={chatContainer}>
        <div className={chatBox}>
          <h1 className={title}>The Reset Room</h1>
          <p className={subtitle}>
            You can start with one of these or ask me anything 💬
          </p>
          <div className={suggestions}>
            {suggestions.map((text, idx) => (
              <button key={idx} onClick={() => handleSuggestion(text)}>{text}</button>
            ))}
          </div>

          <div className={messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === 'user'
                    ? userMessage
                    : assistantMessage
                }
              >
                {msg.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSend} className={form}>
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className={input}
            />
            <button type="submit" className={send}>Send</button>
          </form>

          <p className={disclaimer}>
            This chat does not store your conversation. Please save anything important.
            Responses may be inaccurate and may contain affiliate links.
          </p>
        </div>
      </main>
    </>
  );
}
