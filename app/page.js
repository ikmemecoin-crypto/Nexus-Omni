"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChat = async (e) => {
    if (e.key !== 'Enter' || !message.trim() || loading) return;
    
    setLoading(true);
    const userMsg = { role: "User", content: message };
    setChatLog(prev => [...prev, userMsg]);
    setMessage("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      setChatLog(prev => [...prev, { role: "Nexus", content: data.response || "No response." }]);
    } catch (err) {
      setChatLog(prev => [...prev, { role: "Nexus", content: "Connection Error." }]);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen p-8 bg-[#0a0a0a] text-gray-100 font-sans">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Nexus Omni v3.3</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 p-6 rounded-3xl border border-white/10">
          <h2 className="text-blue-400 mb-4 font-bold">✍️ Code Architect</h2>
          <textarea className="w-full h-64 bg-black/40 p-4 rounded-xl border border-gray-700" placeholder="Paste code here..." />
        </div>
        <div className="bg-gray-900/50 p-6 rounded-3xl border border-white/10 flex flex-col h-[500px]">
          <h2 className="text-purple-400 mb-4 font-bold">💬 Nexus Agent</h2>
          <div className="flex-grow overflow-y-auto space-y-4 mb-4">
            {chatLog.map((chat, i) => (
              <div key={i} className={`p-3 rounded-xl ${chat.role === "Nexus" ? "bg-purple-900/20" : "bg-gray-800"}`}>
                <span className="text-[10px] block opacity-50">{chat.role}</span>
                {chat.content}
              </div>
            ))}
          </div>
          <input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleChat}
            placeholder="Type and press Enter..." 
            className="w-full bg-black/40 p-4 rounded-xl border border-gray-700 outline-none focus:border-purple-500" 
          />
        </div>
      </div>
    </main>
  );
}
