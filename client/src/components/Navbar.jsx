import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h3>DSA Visualizer</h3>

      <div className="nav-links">
        {user && (
          <>
            <Link to="/">Sorting</Link>
            <Link to="/stack">Stack</Link>
            <Link to="/queue">Queue</Link>
            <Link to="/linkedlist">Linked List</Link>
            <Link to="/tree">Tree</Link>
            <Link to="/graph">Graph</Link>
            <Link to="/search">Search</Link>
            <Link to="/history">History</Link>
          </>
        )}
      </div>

      <div className="nav-buttons">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}
