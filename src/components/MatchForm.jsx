import React, { useState } from "react";
import axios from "axios";
import "./MatchForm.css"; // Import the custom CSS

function MatchForm() {
  const [prefs, setPrefs] = useState({ walkability: 5, safety: 5, affordability: 5 });
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/match`, {
        preferences: prefs,
      });
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <h1 className="title">NeighborFit</h1>
        <form onSubmit={handleSubmit} className="form">
          {["walkability", "safety", "affordability"].map((key) => (
            <div key={key} className="form-group">
              <label>{key} (1-10)</label>
              <input
                type="number"
                min="1"
                max="10"
                value={prefs[key]}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setPrefs({ ...prefs, [key]: isNaN(val) ? 1 : val });
                }}
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">Find Matches</button>
        </form>
      </div>

      {results.length > 0 && (
        <div className="results-card">
          <h2>Top Matches:</h2>
          <ul>
            {results.map((n, index) => (
              <li key={index}>
                <strong>{n.name}</strong> (Score: {n.score})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MatchForm;
