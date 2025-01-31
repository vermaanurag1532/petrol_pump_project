import express from 'express';
import cors from 'cors';
import petrolPumpRouter from './routes/petrolPump.router.js';

const app = express();
const PORT = 3000;

// ✅ Move this to the top
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware for JSON parsing
app.use(express.json());

// ✅ Remove the duplicate CORS middleware (not needed)
app.use('/PetrolPumps', petrolPumpRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
