import express from 'express';
import petrolPumpRouter from './routes/petrolPump.router.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/PetrolPumps', petrolPumpRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
