"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [filename, setFilename] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // This function sends your message to the Python brain (api/index.py)
  const handleChat = async (e) => {
    if (e.key && e.key !== 'Enter') return;
    if (!message.trim()) return;
    
    setLoading(true);
    const newChatLog = [...chatLog, { role: "user", content: message }];
    setChatLog(newChatLog);
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setChatLog([...newChatLog, { role: "Nexus", content: data.response || "Agent is sleeping. Check Vercel keys." }]);
    } catch (err) {
      setChatLog([...newChatLog, { role: "Nexus", content: "Connection Error. Is api/index.py created?" }]);
    }
    setMessage("");
    setLoading(false);
  };

  const handlePush = async () => {
    const res = await fetch("/api/push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, content: code }),
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <main className="min-h-screen p-8 bg-[#0a0a0a] text-gray-100 font-sans">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Nexus Omni <span className="text-lg text-gray-500">v3.3 PRO</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Code Architect */}
        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl mb-6 text-blue-400 font-semibold">✍️ Code Architect</h2>
          <input value={filename} onChange={(e)=>setFilename(e.target.value)} placeholder="logic.py" className="w-full bg-black/40 border border-gray-700 p-4 rounded-xl mb-4 text-white" />
          <textarea value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Write code here..." className="w-full h-64 bg-black/40 border border-gray-700 p-4 rounded-xl mb-6 text-white font-mono" />
          <button onClick={handlePush} className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">🚀 Push to Production</button>
        </div>

        {/* Right: Intelligent Agent */}
        <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col">
          <h2 className="text-2xl mb-6 text-purple-400 font-semibold">💬 Nexus Intelligent Agent</h2>
          <div className="flex-grow h-96 overflow-y-auto mb-6 space-y-4 p-2 bg-black/20 rounded-xl">
            {chatLog.map((chat, i) => (
              <div key={i} className={`p-4 rounded-2xl ${chat.role === "Nexus" ? "bg-purple-900/20 border border-purple-500/30 text-purple-100" : "bg-gray-800/40 text-blue-100"}`}>
                <strong className="block text-[10px] uppercase tracking-widest opacity-50 mb-1">{chat.role}</strong>
                {chat.content}
              </div>
            ))}
            {loading && <div className="text-purple-400 animate-pulse text-sm ml-2">Nexus is calculating...</div>}
          </div>
          <input 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            onKeyDown={handleChat}
            placeholder="Command the Nexus..." 
            className="w-full bg-black/40 border border-gray-700 p-4 rounded-xl focus:border-purple-500 outline-none text-white shadow-inner" 
          />
        </div>
      </div>
    </main>
  );
}
