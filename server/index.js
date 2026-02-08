require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3001';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

const playerRoutes = require('./routes/playerRoutes');
const gameRoutes = require('./routes/gameRoutes');
const moveRoutes = require('./routes/moveRoutes');
const gamePlayerRoutes = require('./routes/gamePlayerRoutes');

app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/moves', moveRoutes);
app.use('/api/game-players', gamePlayerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
