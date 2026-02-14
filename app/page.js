"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  // This is the nerve system that talks to your Python API
  const handleChat = async (e) => {
    if (e.key && e.key !== 'Enter') return;
    if (!message.trim() || loading) return;
    
    setLoading(true);
    const userMsg = { role: "user", content: message };
    setChatLog((prev) => [...prev, userMsg]);
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message }),
      });
      const data = await res.json();
      setChatLog((prev) => [...prev, { role: "Nexus", content: data.response || "No response from brain." }]);
    } catch (err) {
      setChatLog((prev) => [...prev, { role: "Nexus", content: "Error: Is api/index.py working?" }]);
    }
    
    setMessage("");
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 bg-[#0a0a0a] text-gray-100 font-sans">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Nexus Omni <span className="text-lg text-gray-500 font-mono">v3.3 PRO</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Card: Architect */}
        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl mb-6 text-blue-400 font-semibold tracking-tight">✍️ Code Architect</h2>
          <input placeholder="Filename (e.g., bot.py)" className="w-full bg-black/40 border border-gray-700 p-4 rounded-xl mb-4 text-white placeholder-gray-500" />
          <textarea placeholder="Paste your code logic here..." className="w-full h-64 bg-black/40 border border-gray-700 p-4 rounded-xl mb-6 text-white font-mono placeholder-gray-500" />
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">🚀 Push to Production</button>
        </div>

        {/* Right Card: Intelligent Agent */}
        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col h-[650px]">
          <h2 className="text-2xl mb-6 text-purple-400 font-semibold tracking-tight">💬 Nexus Intelligent Agent</h2>
          <div className="flex-grow overflow-y-auto mb-6 space-y-4 p-2 custom-scrollbar">
            {chatLog.length === 0 && <p className="text-gray-500 italic">Nexus is ready for your commands...</p>}
            {chatLog.map((chat, i) => (
              <div key={i} className={`p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 ${chat.role === "Nexus" ? "bg-purple-900/20 border border-purple-500/30 text-purple-100" : "bg-gray-800/40 text-blue-100"}`}>
                <strong className="block text-[10px] uppercase tracking-widest opacity-50 mb-1">{chat.role}</strong>
                <p className="whitespace-pre-wrap">{chat.content}</p>
              </div>
            ))}
            {loading && <div className="text-purple-400 animate-pulse text-sm font-medium ml-2">Nexus is processing...</div>}
          </div>
          <div className="relative">
            <input 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              onKeyDown={handleChat}
              disabled={loading}
              placeholder={loading ? "Thinking..." : "Command the Nexus..."} 
              className="w-full bg-black/40 border border-gray-700 p-4 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-white transition-all" 
            />
            {loading && <div className="absolute right-4 top-4 border-2 border-purple-500 border-t-transparent rounded-full w-5 h-5 animate-spin"></div>}
          </div>
        </div>
      </div>
    </main>
  );
}
