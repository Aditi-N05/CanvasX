import { useState } from 'react';

export default function Home() {
  const [headline, setHeadline] = useState("Introducing our Summer Collection!");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    setLoading(true);
    const res = await fetch('/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: headline })
    });
    const data = await res.json();
    setSuggestion(data.suggestion);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-white p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Collaborative AI Canvas</h1>

      <div className="w-full max-w-2xl border border-gray-300 rounded-xl p-6 shadow">
        <label className="block text-sm text-gray-500 mb-2">Campaign Headline</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md mb-4 text-lg"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />

        <button
          onClick={handleSuggest}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Get AI Suggestion"}
        </button>

        {suggestion && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <p className="text-sm text-gray-500 mb-2">AI Suggestion:</p>
            <p className="text-lg italic">“{suggestion}”</p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => setHeadline(suggestion)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => setSuggestion("")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <p className="text-sm text-gray-400">Mock team: 👩🏽‍💻 Arjun • 👩🏻‍🎨 Riya • 🧑🏾‍💼 You</p>
      </div>
    </main>
  );
}
