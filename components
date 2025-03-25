import { useState } from "react";

export default function ResetRoomChat() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Hi! I'm The Reset Room Assistant. Ready to guide you!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("https://api.openai.com/v1/assistants/asst_9Ev0CUxgtKNbxI6aAxMrbnNN/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: newMessages,
        model: "gpt-3.5-turbo",
      }),
    });

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message || {
      role: "assistant",
      content: "Sorry, I couldn’t respond. Try again."
    };

    setMessages([...newMessages, assistantMessage]);
    setLoading(false);
  }

  return (
    <div className="bg-[#D2CDC9] text-[#5C5C5C] font-[Montserrat] min-h-screen p-4">
      <h1 className="font-[Anton] text-3xl mb-4">The Reset Room</h1>
      <div className="bg-white p-4 rounded-2xl shadow-md max-w-xl mx-auto min-h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] ${msg.role === "user" ? "bg-[#5C5C5C] text-white self-end" : "bg-[#EFEFEF] self-start"}`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <div className="italic text-sm">Thinking...</div>}
        </div>
        <form onSubmit={sendMessage} className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 border border-gray-300 rounded-l-xl px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#5C5C5C] text-white px-6 py-2 rounded-r-xl"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
