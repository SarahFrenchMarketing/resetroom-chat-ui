import { useState } from 'react';

const starterQuestions = [
  "How do I start making money online?",
  "Can you help me build confidence?",
  "What is affiliate marketing?",
  "How do I grow on social media?"
];

export default function ResetRoomChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message) return;
    const newMessages = [...messages, { role: 'user', content: message }];
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
      setMessages([...newMessages, { role: 'assistant', content: data.content }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'assistant', content: "Something went wrong. Please try again." }]);
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

  return (
    <div className="min-h-screen bg-[#D2CDC9] flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-3xl flex flex-col p-6 space-y-4">
        <div className="space-y-2">
          <p className="text-center text-gray-600 text-base">
            You can start with one of these or ask me anything 💬
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {starterQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded-full transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 max-h-[400px] overflow-y-auto border border-gray-200 rounded-md p-4 bg-gray-50 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`whitespace-pre-line ${
                msg.role === 'user' ? 'text-right text-gray-800' : 'text-left text-gray-700'
              }`}
            >
              <p className={`inline-block px-4 py-3 rounded-lg ${
                msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'
              }`}>
                {msg.content}
              </p>
            </div>
          ))}
          {loading && <div className="text-left text-gray-400 italic animate-pulse">Typing…</div>}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center border rounded-lg overflow-hidden"
        >
          <textarea
            rows={1}
            placeholder="Type your message..."
            className="flex-grow resize-none px-4 py-3 text-sm focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="bg-[#5C5C5C] hover:bg-black text-white px-5 py-3 text-sm"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
