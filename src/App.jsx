import { useState, useEffect } from 'react';
import "./webstyle.css";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Admin from "./Admin"; // 1. Import the Admin component

export default function App() {
  const [activeTool, setActiveTool] = useState('Google Chat-box');
  const [database, setDatabase] = useState(null);
  const [view, setView] = useState('user'); // 2. New state to toggle views

  // We wrap the fetch logic in a function so we can reuse it!
  const fetchDatabase = () => {
    fetch('http://localhost:5000/api/tools')
      .then((response) => response.json())
      .then((data) => setDatabase(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchDatabase();
  }, []);

  if (!database) {
    return <div style={{ color: 'white', padding: '50px' }}>Loading server data...</div>;
  }

  return (
    <div>
      {/* 3. Added a quick inline style to the Header to hold our Admin Toggle Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', paddingRight: '20px' }}>
        <Header />
        <button 
        onClick={() => setView(view === 'user' ? 'admin' : 'user')}
        style={{ 
          position: 'fixed',    // Pins it to the screen
          top: '12px',          // 12px from the top
          right: '20px',        // 20px from the right
          zIndex: 9999,         // Forces it to sit on top of EVERY other element
          padding: '8px 16px', 
          cursor: 'pointer', 
          background: view === 'user' ? '#4CAF50' : '#888', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
      >
        {view === 'user' ? 'Enter Admin Panel' : 'Back to Site'}
      </button>
      </div>
      
      {/* 4. Conditional Rendering: If view is 'user', show the normal site. If 'admin', show the dashboard. */}
      {view === 'user' ? (
        <>
          <Sidebar setActiveTool={setActiveTool} database={database} />
          <MainContent activeTool={activeTool} database={database} />
        </>
      ) : (
        <Admin database={database} refreshDatabase={fetchDatabase} />
      )}
      
      <Footer />
    </div>
  );
}