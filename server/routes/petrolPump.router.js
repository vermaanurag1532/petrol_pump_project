import express from 'express';
import PetrolPumpController from '../controller/PetrolPump/petrolPump.controller.js';

const PetrolPumpRouter = express.Router();

PetrolPumpRouter.post('/', PetrolPumpController.createPetrolPump); 
PetrolPumpRouter.get('/', PetrolPumpController.getAllPetrolPumps); 
PetrolPumpRouter.get('/:id', PetrolPumpController.getPetrolPumpById); 
PetrolPumpRouter.put('/:id', PetrolPumpController.updatePetrolPump); 
PetrolPumpRouter.delete('/:id', PetrolPumpController.deletePetrolPumpById); 

export default PetrolPumpRouter;
