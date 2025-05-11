import React, { useEffect, useState } from 'react';
import './../voter/voter.css'

const sampleElections = [
  {
    id: 1,
    title: "Presidential Election 2025",
    date: "2025-11-08",
    status: "Upcoming"
  },
  {
    id: 2,
    title: "City Council Election",
    date: "2025-06-15",
    status: "Ongoing"
  },
  {
    id: 3,
    title: "School Board Election",
    date: "2025-04-10",
    status: "Completed"
  }
];

export default function ViewElections() {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    // Replace with real fetch call later
    setElections(sampleElections);
  }, []);

  return (
    <div className="voter-home-container">
      <div className="elections-card">
        <h2>Available Elections</h2>
        {elections.length === 0 ? (
          <p>No elections found.</p>
        ) : (
          <div className="election-list">
            {elections.map(election => (
              <div className="election-item" key={election.id}>
                <h3>{election.title}</h3>
                <p><strong>Date:</strong> {election.date}</p>
                <p><strong>Status:</strong> {election.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
