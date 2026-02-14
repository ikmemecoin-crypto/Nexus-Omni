import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Nexus Omni <span className="text-lg text-gray-500">v3.0</span>
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-800 rounded-lg">Clear Chat</button>
          <button className="px-4 py-2 bg-gray-800 rounded-lg">Dark/Light</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Code Architect + Vault */}
        <div className="space-y-8">
          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl mb-6">✍️ Code Architect</h2>
            <input placeholder="Filename" className="w-full bg-gray-800 rounded-lg p-4 mb-4" />
            <textarea placeholder="Source Code" className="w-full h-64 bg-gray-800 rounded-lg p-4 mb-6" />
            <button className="w-full py-4 bg-blue-600 rounded-lg font-bold">🚀 Push to Production</button>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl mb-6">📁 Repository Vault</h2>
            <div className="text-gray-400">Vault files will appear here...</div>
          </div>
        </div>

        {/* Right: Chat */}
        <div className="bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl mb-6">💬 Nexus Intelligent Agent</h2>
          <div className="h-96 bg-gray-800 rounded-lg p-4 mb-6 overflow-y-auto">
            <p className="text-gray-400">Chat messages will appear here...</p>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <button className="py-3 bg-gray-800 rounded-lg">🔍 Audit</button>
            <button className="py-3 bg-gray-800 rounded-lg">📐 UI UX</button>
            <button className="py-3 bg-gray-800 rounded-lg">🧠 Memory</button>
            <button className="py-3 bg-gray-800 rounded-lg">🚀 Tool</button>
          </div>
          <input placeholder="Command the Nexus..." className="w-full bg-gray-800 rounded-lg p-4" />
        </div>
      </div>
    </main>
  )
}
