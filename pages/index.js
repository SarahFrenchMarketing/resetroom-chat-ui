import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const suggestions = [
    'How do I start making money online?',
    'Can you help me build confidence?',
    'What is affiliate marketing?',
    'How do I grow on social media?',
  ]

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (message) => {
    if (!message.trim()) return
    const newMessages = [...messages, { role: 'user', content: message }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    })

    const data = await res.json()
    setMessages([...newMessages, data])
    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestion = (text) => {
    sendMessage(text)
  }

  return (
    <>
      <Head>
        <title>The Reset Room</title>
      </Head>
      <main className="chatContainer">
        <div className="chatBox">
          <h1 className="title">The Reset Room</h1>
          <p className="subtitle">
            You can start with one of these or ask me anything 💬
          </p>

          <div className="suggestions">
            {suggestions.map((text, idx) => (
              <button key={idx} onClick={() => handleSuggestion(text)}>
                {text}
              </button>
            ))}
          </div>

          <div className="messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.role === 'user' ? 'userMessage' : 'assistantMessage'
                }
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="assistantMessage">Thinking...</div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="inputArea">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything"
            />
            <button type="submit">Send</button>
          </form>

          <p className="disclaimer">
            This chat does not store your conversation. Please save anything
            important. Responses may be inaccurate and may contain affiliate
            links. Check your spam folder if you request the eBook.
          </p>
        </div>
      </main>
    </>
  )
}
