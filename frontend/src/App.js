import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFromBackend = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/hello');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error connecting to backend: ' + error.message);
    }
    setLoading(false);
  };

  const renderContent = () => {
    return (
      <div className="render-content">
        <h2>Render Demo</h2>
        <p>This is a basic React component demonstrating rendering functionality.</p>
        <div className="demo-section">
          <h3>Dynamic Content</h3>
          <p>Current time: {new Date().toLocaleString()}</p>
        </div>
        <div className="demo-section">
          <h3>Backend Integration</h3>
          <button onClick={fetchFromBackend} disabled={loading}>
            {loading ? 'Loading...' : 'Call Backend API'}
          </button>
          {message && (
            <div className="message">
              <strong>Backend Response:</strong> {message}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Render POC Application</h1>
        <p>Frontend: React.js | Backend: Node.js</p>
      </header>
      <main className="App-main">
        {renderContent()}
      </main>
      <footer className="App-footer">
        <p>Built for Render deployment POC</p>
      </footer>
    </div>
  );
}

export default App;
