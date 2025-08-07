import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function History() {
  const { token } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sessions/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(err => console.error('Failed to fetch history', err));
  }, [token]);

  return (
    <div className="history-container">
      <h2>Sorting History</h2>
      <table>
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Steps</th>
            <th>Input</th>
            <th>Sorted</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s._id}>
              <td>{s.algorithm}</td>
              <td>{s.steps}</td>
              <td>{s.input.join(', ')}</td>
              <td>{s.sorted.join(', ')}</td>
              <td>{new Date(s.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
