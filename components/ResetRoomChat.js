// components/ResetRoomChat.js
import React, { useState } from 'react';

const exampleQuestions = [
  "How do I start affiliate marketing?",
  "Can you help me find my niche?",
  "How do I make money with content?",
  "What’s the first step to build confidence?",
  "How do I schedule my content like Sarah?"
];

const ResetRoomChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await response.json();
    setMessages([...newMessages, { sender: 'assistant', text: data.reply }]);
  };

  const handleSuggestionClick = (text) => {
    setInput(text);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>The Reset Room</h1>
      <p style={styles.subheading}>Hi! I'm The Reset Room Assistant. Ready to guide you! Ask me anything…</p>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.sender === 'user' ? styles.userMessage : styles.assistantMessage}>
            {msg.text}
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div style={styles.promptContainer}>
          <p style={styles.promptHeader}>You can start with any of these, or ask anything else you need ✨</p>
          <div style={styles.promptButtons}>
            {exampleQuestions.map((q, i) => (
              <button key={i} onClick={() => handleSuggestionClick(q)} style={styles.promptButton}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={sendMessage} style={styles.inputForm}>
        <input
          style={styles.input}
          value={input}
          placeholder="Ask me anything..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" style={styles.sendButton}>Send</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Montserrat', sans-serif",
    backgroundColor: '#D2CDC9',
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#5C5C5C',
  },
  heading: {
    fontFamily: "'Anton', sans-serif",
    fontSize: '42px',
    marginBottom: '10px',
    color: '#5C5C5C',
  },
  subheading: {
    fontSize: '18px',
    marginBottom: '30px',
    textAlign: 'center',
    maxWidth: '600px',
  },
  chatBox: {
    width: '100%',
    maxWidth: '700px',
    minHeight: '280px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '25px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
  },
  userMessage: {
    textAlign: 'right',
    padding: '10px',
    marginBottom: '8px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  },
  assistantMessage: {
    textAlign: 'left',
    padding: '10px',
    marginBottom: '8px',
    backgroundColor: '#efefef',
    borderRadius: '8px',
  },
  promptContainer: {
    maxWidth: '700px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  promptHeader: {
    marginBottom: '12px',
    fontWeight: 'bold',
  },
  promptButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  promptButton: {
    padding: '10px 16px',
    backgroundColor: '#5C5C5C',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  inputForm: {
    display: 'flex',
    maxWidth: '700px',
    width: '100%',
  },
  input: {
    flex: 1,
    padding: '12px',
    borderRadius: '6px 0 0 6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  sendButton: {
    padding: '12px 20px',
    backgroundColor: '#5C5C5C',
    color: '#fff',
    border: 'none',
    borderRadius: '0 6px 6px 0',
    cursor: 'pointer',
  }
};

export default ResetRoomChat;
