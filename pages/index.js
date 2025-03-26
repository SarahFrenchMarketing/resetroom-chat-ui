import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import '../styles/globals.css';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;
    const newMessages = [...messages, { role: 'user', content: message }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages([...newMessages, data]);
    } catch (error) {
      console.error('Message send error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
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

      <main className="chatContainer">
        <div className="chatBox">
          <h1 className="title">The Reset Room</h1>
          <p className="subtitle">
            You can start with one of these or ask me anything 💬
          </p>

          <div className="suggestions-container">
            <button className="suggestion-button" onClick={() => handleSuggestion('I feel stuck in life — where do I even start?')}>
              I feel stuck in life — where do I even start?
            </button>
            <button className="suggestion-button" onClick={() => handleSuggestion('I’m ready to create digital income but don’t know my niche')}>
              I’m ready to create digital income but don’t know my niche
            </button>
            <button className="suggestion-button" onClick={() => handleSuggestion('Can you help me write a caption like @officialsarahfrench?')}>
              Can you help me write a caption like @officialsarahfrench?
            </button>
            <button className="suggestion-button" onClick={() => handleSuggestion('How do I use Funnels of Course with DWA?')}>
              How do I use Funnels of Course with DWA?
            </button>
          </div>

          <div className="messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.role === 'user' ? 'userMessage' : 'assistantMessage'}
              >
                {msg.content}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="inputRow"
          >
            <textarea
              className="chatInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything"
              rows={1}
            />
            <button type="submit" className="sendButton">
              Send
            </button>
          </form>

          <p className="disclaimer">
            This chat does not store your conversation. Please save anything important. Responses may be inaccurate and may contain affiliate links. Check your spam folder if you request the eBook.
          </p>
        </div>
      </main>
    </>
  );
}
