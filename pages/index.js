import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const suggestions = [
    'I feel stuck — where do I even start?',
    'I’m ready to create digital income but don’t know my niche',
    'Can you help me write a caption like @officialsarahfrench?',
    'How do I use Funnels of Course with DWA?'
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
      <div style={styles.container}>
        <div style={styles.chatBox}>
          <h1 style={styles.title}>The Reset Room</h1>
          <p style={styles.subtitle}>You can start with one of these or ask me anything 💬</p>
          <div style={styles.suggestions}>
            {suggestions.map((text, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(text)}
                style={styles.suggestionBtn}
              >
                {text}
              </button>
            ))}
          </div>
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.message,
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? '#d2cdc9' : '#f5f5f5',
                }}
              >
                {msg.content.split('\n').map((line, idx) => (
                  <p key={idx} style={styles.messageText}>{line}</p>
                ))}
              </div>
            ))}
            {loading && (
              <div style={{ ...styles.message, background: '#f5f5f5', fontStyle: 'italic' }}>
                Typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything"
              style={styles.input}
            />
            <button type="submit" style={styles.sendBtn}>Send</button>
          </form>

          <p style={styles.disclaimer}>
            This chat does not store your conversation. Please save anything important.
            Responses may be inaccurate and may contain affiliate links. Check your spam folder if you request the eBook.
          </p>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    background: '#D2CDC9',
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'Montserrat, sans-serif',
  },
  chatBox: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '800px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Anton, sans-serif',
    fontSize: '2.5rem',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#5C5C5C',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1rem',
    color: '#5C5C5C',
  },
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  suggestionBtn: {
    padding: '12px 20px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #eaeaea, #f8f8f8)',
    border: '1px solid #ddd',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    whiteSpace: 'wrap',
    maxWidth: '100%',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '30px',
  },
  message: {
    maxWidth: '90%',
    padding: '16px',
    borderRadius: '12px',
    fontSize: '0.95rem',
    whiteSpace: 'pre-wrap',
  },
  messageText: {
    margin: 0,
    lineHeight: 1.5,
  },
  form: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  sendBtn: {
    padding: '12px 20px',
    backgroundColor: '#5C5C5C',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  disclaimer: {
    marginTop: '20px',
    fontSize: '0.8rem',
    textAlign: 'center',
    color: '#777',
  },
};
