import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import playerRoutes from './routes/playerRoutes';
import gameRoutes from './routes/gameRoutes';
import moveRoutes from './routes/moveRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3001';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/moves', moveRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

