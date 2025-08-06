import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws'; // <-- Import WebSocket type

const app = express();
const port = process.env.PORT || 3001;
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

app.use(cors());
app.use(express.json());

// --- Primary API Route ---
// Now uses explicit types for 'req' and 'res'
app.post('/api/v1/enhance', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const aiResponse = await axios.post(`${AI_SERVICE_URL}/process`, { prompt });
    res.status(200).json(aiResponse.data);

  } catch (error) {
    // --- Stricter Error Handling ---
    // We now safely handle the 'unknown' error type
    console.error("Error proxying to AI service:", error);
    if (axios.isAxiosError(error)) {
        return res.status(error.response?.status || 500).json({ 
          error: 'Error from AI service', 
          details: error.response?.data 
        });
    }
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

// --- Server and WebSocket Setup ---
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Use the imported 'WebSocket' type for 'ws'
wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected for real-time collaboration.');

  ws.on('message', (message: Buffer) => { // Messages are Buffers by default
    console.log('received: %s', message.toString());
    
    // Broadcast message to all other clients for real-time sync
    wss.clients.forEach((client: WebSocket) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

server.listen(port, () => {
  console.log(`🚀 API Gateway running at http://localhost:${port}`);
});