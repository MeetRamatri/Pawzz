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

const path = require('path');

// Routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/clinics', require('./src/routes/clinicRoutes'));
app.use('/api/rescuers', require('./src/routes/rescuerRoutes'));
app.use('/api/rescue-requests', require('./src/routes/rescueRequestRoutes'));
app.use('/api/dashboard', require('./src/routes/dashboardRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));
app.use('/api/pets', require('./src/routes/petRoutes'));
app.use('/api/appointments', require('./src/routes/appointmentRoutes'));

// Serve 'uploads' directory statically
app.use('/uploads', express.static(require('path').join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Pawzz API is running perfectly!', timestamp: new Date() });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
