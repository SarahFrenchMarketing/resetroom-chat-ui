import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const examplePrompts = [
    "I feel stuck — where do I even start?",
    "I’m ready to create digital income but don’t know my niche",
    "Can you help me write a caption like @officialsarahfrench?",
    "How do I use Funnels of Course with DWA?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const newMessages = [...messages, { role: 'user', content: messageText }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, data]);
    } catch (err) {
      console.error('Error sending message', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleClickSuggestion = (text) => {
    sendMessage(text);
  };

  return (
    <>
      <Head>
        <title>The Reset Room</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main style={{
        background: '#D2CDC9',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 20px',
        fontFamily: 'Montserrat, sans-serif'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
          padding: '40px 30px',
          width: '100%',
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <h1 style={{
            fontFamily: 'Anton, sans-serif',
            fontSize: '2.4rem',
            textAlign: 'center',
            color: '#5C5C5C',
            marginBottom: '10px'
          }}>
            The Reset Room
          </h1>
          <p style={{
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '1rem',
            color: '#777'
          }}>
            You can start with one of these or ask me anything 💬
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '30px'
          }}>
            {examplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleClickSuggestion(prompt)}
                style={{
                  background: 'linear-gradient(135deg, #f7f7f7, #ffffff)',
                  border: '1px solid #eee',
                  borderRadius: '20px',
                  padding: '10px 16px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s ease',
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flexGrow: 1,
            marginBottom: '30px'
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? '#E6F0ED' : '#f5f5f5',
                  borderRadius: '16px',
                  padding: '12px 16px',
                  maxWidth: '85%',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  color: '#333'
                }}
              >
                {msg.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={{
            display: 'flex',
            borderTop: '1px solid #eee',
            paddingTop: '20px'
          }}>
            <input
              type="text"
              value={input}
              placeholder="Ask me anything"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flexGrow: 1,
                padding: '14px 18px',
                borderRadius: '24px 0 0 24px',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '1rem',
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading}
              style={{
                padding: '0 24px',
                border: 'none',
                borderRadius: '0 24px 24px 0',
                background: '#5C5C5C',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>

          <p style={{
            fontSize: '0.75rem',
            textAlign: 'center',
            marginTop: '16px',
            color: '#999'
          }}>
            This chat does not store your conversation. Please save anything important.
            Responses may be inaccurate and may contain affiliate links. Check your spam folder if you request the eBook.
          </p>
        </div>
      </main>
    </>
  );
}
