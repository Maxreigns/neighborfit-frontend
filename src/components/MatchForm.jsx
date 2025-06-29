import React, { useState } from 'react';
import axios from 'axios';

function MatchForm() {
  const [prefs, setPrefs] = useState({ walkability: 5, safety: 5, affordability: 5 });
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/match`, {
  preferences: prefs
});

      setResults(res.data);
    } catch (err) {
      console.error("Error fetching matches:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['walkability', 'safety', 'affordability'].map((key) => (
          <div key={key}>
            <label className="block capitalize">{key} (1-10)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={prefs[key]}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                setPrefs({ ...prefs, [key]: isNaN(val) ? 1 : val });
              }}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Find Matches</button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Top Matches:</h2>
        <ul className="list-disc ml-6">
          {results.map((n, index) => (
            <li key={index}>{n.name} (Score: {n.score})</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MatchForm;
