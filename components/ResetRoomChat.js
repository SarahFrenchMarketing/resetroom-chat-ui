import { useState } from 'react';

export default function ResetRoomChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await response.json();
    setMessages([...newMessages, data]);
  };

  return (
    <div className="w-full max-w-xl">
      <div className="border rounded-md bg-white shadow-md p-4 mb-4 h-60 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="block px-2 py-1 rounded bg-gray-100">{msg.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className="bg-[#5C5C5C] text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
