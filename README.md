# Render POC Project

This is a Proof of Concept (POC) project demonstrating deployment on Render with separate frontend and backend services.

## Project Structure

```
Render/
├── frontend/          # React.js application
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/           # Node.js Express server
│   ├── server.js
│   └── package.json
└── README.md
```

## Features

### Frontend (React.js)
- Modern React 18 application
- Basic rendering functionality
- Dynamic content display
- Backend API integration
- Responsive design
- Real-time clock display

### Backend (Node.js)
- Express.js server
- Hello World API endpoint (`/api/hello`)
- Health check endpoint (`/api/health`)
- CORS enabled
- Static file serving for production
- Error handling middleware

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Running the Application

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Backend will run on `http://localhost:3001`

4. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

### Development with Hot Reload
For backend development with auto-restart:
```bash
cd backend
npm run dev
```

## API Endpoints

### GET /api/hello
Returns a hello world message with timestamp and environment info.

**Response:**
```json
{
  "message": "Hello World from Render Backend!",
  "timestamp": "2025-01-27T10:30:00.000Z",
  "status": "success",
  "environment": "production"
}
```

### GET /api/health
Returns server health status and uptime information.

**Response:**
```json
{
  "status": "healthy",
  "uptime": 3600,
  "timestamp": "2025-01-27T10:30:00.000Z",
  "version": "1.0.0"
}
```

## Deployment on Render

### Backend Deployment
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the following configuration:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Root Directory:** `backend`

### Frontend Deployment
1. Create a new Static Site on Render
2. Set the following configuration:
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Publish Directory:** `frontend/build`
   - **Root Directory:** `frontend`

### Environment Variables
Set the following environment variables in Render:
- `NODE_ENV=production`
- `PORT` (automatically set by Render)

## Production Build

### Backend
```bash
cd backend
npm install --production
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run build
```

The build files will be created in `frontend/build/` directory.

## Technologies Used

- **Frontend:** React 18, CSS3, HTML5
- **Backend:** Node.js, Express.js, CORS
- **Development:** npm, nodemon
- **Deployment:** Render

## License

MIT License - feel free to use this project for your own Render POC deployments.
