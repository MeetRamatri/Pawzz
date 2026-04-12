const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./src/routes/authRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pawzz API is running perfectly!', timestamp: new Date() });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
