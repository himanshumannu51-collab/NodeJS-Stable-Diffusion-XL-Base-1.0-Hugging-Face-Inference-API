import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setImage(null);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setImage(data.image);
    setLoading(false);
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>AI Image Generator</h1>

      <input
        placeholder="Enter prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "300px", padding: "10px" }}
      />
      <button onClick={generate} style={{ marginLeft: "10px" }}>
        Generate
      </button>

      {loading && <p>Generating...</p>}

      {image && (
        <div style={{ marginTop: 20 }}>
          <img src={image} alt="Result" width="512" />
        </div>
      )}
    </div>
  );
}
