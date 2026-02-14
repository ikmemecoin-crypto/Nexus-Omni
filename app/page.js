"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChat = async (e) => {
    // This makes the Enter key work
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
      setChatLog((prev) => [...prev, { role: "Nexus", content: data.response || "No response." }]);
    } catch (err) {
      setChatLog((prev) => [...prev, { role: "Nexus", content: "Check Vercel Environment Variables." }]);
    }
    
    setMessage("");
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 bg-[#0a0a0a] text-gray-100">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Nexus Omni <span className="text-lg text-gray-500">v3.3 PRO</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Architect Side */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl mb-6 text-blue-400">✍️ Code Architect</h2>
          <input placeholder="Filename" className="w-full bg-gray-800 rounded-lg p-4 mb-4" />
          <textarea placeholder="Source Code" className="w-full h-64 bg-gray-800 rounded-lg p-4 mb-6" />
          <button className="w-full py-4 bg-blue-600 rounded-lg font-bold">🚀 Push to Production</button>
        </div>

        {/* AI Agent Side */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl flex flex-col h-[600px]">
          <h2 className="text-2xl mb-6 text-purple-400">💬 Nexus Intelligent Agent</h2>
          <div className="flex-grow overflow-y-auto mb-6 space-y-4 p-2 bg-black/20 rounded-xl">
            {chatLog.map((chat, i) => (
              <div key={i} className={`p-4 rounded-xl ${chat.role === "Nexus" ? "bg-purple-900/20 border border-purple-500/30" : "bg-gray-800/60"}`}>
                <span className="text-[10px] uppercase opacity-40 block mb-1 font-bold">{chat.role}</span>
                {chat.content}
              </div>
            ))}
            {loading && <div className="text-purple-400 animate-pulse text-sm">Nexus is thinking...</div>}
          </div>
          <input 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            onKeyDown={handleChat}
            placeholder="Command the Nexus..." 
            className="w-full bg-gray-800 rounded-lg p-4 focus:ring-2 focus:ring-purple-500 outline-none text-white" 
          />
        </div>
      </div>
    </main>
  );
}
