import express from 'express';
import cors from 'cors';
import petrolPumpRouter from './routes/petrolPump.router.js';
import PetrolPumpDetailController from './controller/PetrolPump/detail.controller.js';

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:3001', 
  methods: 'GET,POST,PUT,DELETE', 
  allowedHeaders: 'Content-Type, Authorization' 
}));

app.use(express.json());

app.use('/PetrolPumps', petrolPumpRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
