import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse("");

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.text || "No response from server.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "0 auto" }}>
      <h1>Cohere Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          style={{ width: "100%", padding: "10px" }}
          required
        />
        <button type="submit" style={{ marginTop: "10px" }} disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {!error && response && (
          <>
            <strong>Response:</strong>
            <p>{response}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
