import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={styles.header}>
      {/* Empty space to balance layout */}
      <div style={styles.spacer}></div>

      {/* Centered username */}
      <div style={styles.greeting}>
        👋 Hi, {user?.username || 'User'}
      </div>

      {/* Logout button aligned right */}
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.1rem',
    position: 'relative',
  },
  spacer: {
    width: '80px', 
  },
  greeting: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#fff',
    color: '#007bff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  }
};

export default Header;
