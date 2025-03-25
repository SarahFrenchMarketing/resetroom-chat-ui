import Head from 'next/head';
import ResetRoomChat from '../components/ResetRoomChat';

export default function Home() {
 return (
  <>
    <Head>
      <title>The Reset Room</title>
    </Head>
    <div className="chat-wrapper">
      <h1>The Reset Room</h1>
      <div className="subtitle">Hi! I'm your Reset Room coach. You can start with one of these questions or ask me anything 💬</div>

      <div className="suggestions">
        {exampleQuestions.map((question, index) => (
          <button key={index} onClick={() => sendMessage(question)}>{question}</button>
        ))}
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="message"
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.role === 'user' ? '#E8E8E8' : '#F2F2F2',
              borderRadius: '12px',
              whiteSpace: 'pre-wrap'
            }}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <textarea
          rows="2"
          className="input"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
        />
        <button onClick={() => sendMessage(input)} className="send-button">
          {loading ? '...' : 'Send'}
        </button>
      </div>

      <p style="font-size: 0.75rem; color: #777; text-align: center; margin-top: 20px;">
        This chat does not store your conversation. Please save important info elsewhere. Responses may not be 100% accurate and may contain affiliate links.
      </p>
    </div>
  </>
);
