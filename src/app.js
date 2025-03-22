import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { sequelize, connectDB } from './config/db.js';
import Project from './models/Project.js';

// Import routes
import projectRoutes from './routes/projectRoutes.js';
import jobAnalysisRoutes from './routes/jobAnalysisRoutes.js';

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database and sync models
const initializeDatabase = async () => {
  await connectDB();
  await sequelize.sync({ alter: true });
  console.log('Database synchronized');
};

initializeDatabase();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Portfolio' });
});

// Admin route 
app.get('/admin', (req, res) => {
  res.render('admin', { title: 'Admin - Add Project' });
});

// API routes
app.use('/api/projects', projectRoutes);
app.use('/api/job-analysis', jobAnalysisRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 