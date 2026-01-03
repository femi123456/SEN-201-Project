import React, { useState, useRef, useEffect } from 'react';

export default function NileAI({ user }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Hi ${user.name.split(' ')[0]}! I'm NileAI. How can I help you find resources today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          userContext: {
            department: user.department,
            level: user.level
          },
          history: messages
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.message }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-card rounded-2xl border border-primary-light flex flex-col h-[500px] shadow-xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-primary-light bg-primary-light/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-gold flex items-center justify-center text-primary font-bold">
            N
          </div>
          <div>
            <h3 className="font-bold text-text-main text-sm">NileAI Assistant</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-text-muted">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary-light hover:scrollbar-thumb-accent-gold/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user'
                ? 'bg-accent-gold text-primary font-medium rounded-tr-none'
                : 'bg-primary-light/30 text-text-main rounded-tl-none border border-primary-light'
              }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-primary-light/30 p-3 rounded-2xl rounded-tl-none border border-primary-light flex gap-1">
              <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-accent-gold rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={onSend} className="p-4 border-t border-primary-light bg-primary/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask NileAI for resources..."
            className="flex-1 bg-primary-light/50 border border-primary-light rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-accent-gold transition-colors"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-accent-gold text-primary p-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
