import React, { useState } from "react";
import axios from "axios";
import './index.css';

const App = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrends = async () => {
    setLoading(true);
    setError(""); // Clear any previous error
    try {
      const response = await axios.post("http://localhost:5001/run-script");
      setTrends(response.data.data.trends); // Adjust to match the correct response structure
    } catch (err) {
      console.error("Error fetching trends:", err);
      setError("Failed to fetch trends. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchTrends} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Trends"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {trends.length > 0 ? (
          <ul>
            {trends.map((trend, index) => (
              <li key={index}>
                <h3>{trend.topic}</h3>
                <p><strong>Category:</strong> {trend.category}</p>
                <p><strong>Posts:</strong> {trend.posts}</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No trends available. Click the button to fetch data.</p>
        )}
      </div>
    </div>
  );
};

export default App;
