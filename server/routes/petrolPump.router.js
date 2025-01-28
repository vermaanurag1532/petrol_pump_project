import express from 'express';
import PetrolPumpController from '../controller/PetrolPump/petrolPump.controller.js';
import PetrolPumpDetailController from '../controller/PetrolPump/detail.controller.js'

const PetrolPumpRouter = express.Router();

PetrolPumpRouter.post('/detail', PetrolPumpDetailController.createPetrolPump); 
PetrolPumpRouter.get('/detail', PetrolPumpDetailController.getAllPetrolPumps); 
PetrolPumpRouter.get('/detail/:id', PetrolPumpDetailController.getPetrolPumpById); 
PetrolPumpRouter.get('/detail/:id/:date', PetrolPumpDetailController.getPetrolPumpByIdAndDate);
PetrolPumpRouter.put('/detail/:id', PetrolPumpDetailController.updatePetrolPump); 
PetrolPumpRouter.delete('/detail/:id', PetrolPumpDetailController.deletePetrolPumpById); 

PetrolPumpRouter.post('/', PetrolPumpController.createPetrolPump); 
PetrolPumpRouter.get('/', PetrolPumpController.getAllPetrolPumps); 
PetrolPumpRouter.get('/:id', PetrolPumpController.getPetrolPumpById); 
PetrolPumpRouter.put('/:id', PetrolPumpController.updatePetrolPump); 
PetrolPumpRouter.delete('/:id', PetrolPumpController.deletePetrolPumpById); 

export default PetrolPumpRouter;
