const express = require('express');
const cors = require('cors');
const path = require('path');
const { testConnection, getPool } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build (for production)
app.use(express.static(path.join(__dirname, 'public')));

// Database connection test on startup
testConnection();

// API Routes
app.get('/api/hello', (req, res) => {
  const timestamp = new Date().toISOString();
  res.json({
    message: 'Hello World from Render Backend!',
    timestamp: timestamp,
    status: 'success',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/health', async (req, res) => {
  try {
    const pool = getPool();
    const client = await pool.connect();
    const dbResult = await client.query('SELECT NOW() as db_time');
    client.release();
    
    res.json({
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      database: {
        connected: true,
        time: dbResult.rows[0].db_time
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      database: {
        connected: false,
        error: error.message
      }
    });
  }
});

// New database test endpoint
app.get('/api/db-test', async (req, res) => {
  try {
    const pool = getPool();
    const client = await pool.connect();
    
    // Test query
    const result = await client.query(`
      SELECT 
        current_database() as database_name,
        current_user as user_name,
        version() as postgres_version,
        NOW() as current_time
    `);
    
    client.release();
    
    res.json({
      success: true,
      message: 'Database connection successful',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check available at http://localhost:${PORT}/api/health`);
  console.log(`🌍 Hello world API at http://localhost:${PORT}/api/hello`);
  console.log(`🗄️ Database test available at http://localhost:${PORT}/api/db-test`);
});