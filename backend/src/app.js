const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const runMigrations = require('./utils/runMigrations');
const runSeeds = require('./utils/runSeeds');

const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Load env
dotenv.config();

// Create app FIRST
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Health
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Multi-Tenant SaaS Backend Running' });
});

// Start
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await runMigrations();
    await runSeeds();
    app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
  } catch (err) {
    console.error('Startup failed', err);
    process.exit(1);
  }
}

startServer();
module.exports = app;
