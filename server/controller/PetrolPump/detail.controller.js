import PetrolPumpService from '../../service/PetrolPump/detail.service.js';

const PetrolPumpController = {
    createPetrolPump: async (req, res) => {
        try {
            const result = await PetrolPumpService.createPetrolPump(req.body);
            res.status(201).json({ message: 'Petrol Pump created successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error creating Petrol Pump', error: error.message });
        }
    },

    getAllPetrolPumps: async (req, res) => {
        try {
            const result = await PetrolPumpService.getAllPetrolPumps();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching Petrol Pumps', error: error.message });
        }
    },

    getPetrolPumpById: async (req, res) => {
        try {
            const result = await PetrolPumpService.getPetrolPumpById(req.params.id);
            if (!result) {
                return res.status(404).json({ message: 'Petrol Pump not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching Petrol Pump', error: error.message });
        }
    },

    getPetrolPumpByIdAndDate: async (req, res) => {
        try {
            const result = await PetrolPumpService.getPetrolPumpByIdAndDate(req.params.id, req.params.date);
            if (!result) {
                return res.status(404).json({ message: 'Petrol Pump not found' });
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching Petrol Pump', error: error.message });
        }
    },

    updatePetrolPump: async (req, res) => {
        try {
            const result = await PetrolPumpService.updatePetrolPump(
                req.params.Pid,
                req.params.Vid,
                req.body.ExitTime,
                req.body.FillingTime,
                req.body.ServerConnected
            );
            res.status(200).json({ message: 'Petrol Pump updated successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error updating Petrol Pump', error: error.message });
        }
    },

    deletePetrolPumpById: async (req, res) => {
        try {
            const result = await PetrolPumpService.deletePetrolPumpById(req.params.id);
            res.status(200).json({ message: 'Petrol Pump deleted successfully', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting Petrol Pump', error: error.message });
        }
    },
};

export default PetrolPumpController;