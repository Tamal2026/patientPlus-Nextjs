"use client";
import { useState } from "react";

export default function AiFeature() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ${process.env.NEXT_PUBLIC_BASE_URL}

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Ai/api/AiBackend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Frontend Error:", err.message);
      alert("Failed to fetch AI response. Please try again.");
    }
  };

  return (
    <div className="container mt-20">
      <h1>AI Prompt Assistant</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your problem..."
        />
        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h2>AI Response</h2>
          <p>{response.answer}</p>
          <h3>Suggested Department</h3>
          <p>{response.suggestion}</p>
        </div>
      )}
    </div>
  );
}
