return (
  <div className="bg-[#D2CDC9] text-[#5C5C5C] font-[Montserrat] min-h-screen flex flex-col items-center justify-center px-4 py-10">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 flex flex-col min-h-[600px]">
      <h1 className="text-4xl font-[Anton] mb-6 text-center">The Reset Room</h1>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`rounded-2xl px-4 py-3 max-w-[80%] leading-snug tracking-wide shadow-sm ${
              msg.role === "user"
                ? "bg-[#5C5C5C] text-white self-end rounded-br-none ml-auto"
                : "bg-[#F6F4F2] text-[#5C5C5C] self-start rounded-bl-none"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="italic text-sm text-center">Thinking...</div>}
      </div>

      <form onSubmit={sendMessage} className="mt-6 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 border border-[#ccc] rounded-l-xl px-4 py-3 focus:outline-none bg-[#F9F9F9]"
        />
        <button
          type="submit"
          className="bg-[#5C5C5C] text-white px-6 py-3 rounded-r-xl font-semibold hover:bg-[#4b4b4b] transition"
        >
          Send
        </button>
      </form>
    </div>
  </div>
);
