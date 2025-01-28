import PetrolPumpService from '../../service/PetrolPump/petrolPump.service.js';

const PetrolPumpController = {
    createPetrolPump: async (req, res) => {
        try {
            const { name, location } = req.body;
            const result = await PetrolPumpService.createPetrolPump(name, location);
            res.status(201).json({ message: 'Petrol Pump created successfully', result });
        } catch (error) {
            console.error('Error creating petrol pump:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    getAllPetrolPumps: async (req, res) => {
        try {
            const result = await PetrolPumpService.getAllPetrolPumps();
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching petrol pumps:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    getPetrolPumpById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await PetrolPumpService.getPetrolPumpById(id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Petrol Pump not found' });
            }
        } catch (error) {
            console.error('Error fetching petrol pump by ID:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    updatePetrolPump: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, location } = req.body;
            const result = await PetrolPumpService.updatePetrolPump(id, name, location);
            res.status(200).json({ message: 'Petrol Pump updated successfully', result });
        } catch (error) {
            console.error('Error updating petrol pump:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    deletePetrolPumpById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await PetrolPumpService.deletePetrolPumpById(id);
            res.status(200).json({ message: 'Petrol Pump deleted successfully', result });
        } catch (error) {
            console.error('Error deleting petrol pump:', error.message);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
};

export default PetrolPumpController;
