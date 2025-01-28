import PetrolPumpService from '../../service/PetrolPump/detail.service.js';

const PetrolPumpDetailController = {
    createPetrolPump: async (req, res) => {
        try {
            const { petrolPumpID, vehicleID, enteringTime, exitTime, fillingTime, date } = req.body;
            const result = await PetrolPumpService.createPetrolPump(
                petrolPumpID,
                vehicleID,
                enteringTime,
                exitTime,
                fillingTime,
                date
            );
            res.status(201).json({ message: 'Petrol Pump record created successfully.', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create Petrol Pump record.', error: error.message });
        }
    },

    getAllPetrolPumps: async (req, res) => {
        try {
            const result = await PetrolPumpService.getAllPetrolPumps();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch Petrol Pump records.', error: error.message });
        }
    },

    getPetrolPumpById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await PetrolPumpService.getPetrolPumpById(id);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Petrol Pump record not found.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch Petrol Pump record.', error: error.message });
        }
    },

    updatePetrolPump: async (req, res) => {
        try {
            const { petrolPumpID, vehicleID, enteringTime, exitTime, fillingTime, date } = req.body;
            const result = await PetrolPumpService.updatePetrolPump(
                petrolPumpID,
                vehicleID,
                enteringTime,
                exitTime,
                fillingTime,
                date
            );
            res.status(200).json({ message: 'Petrol Pump record updated successfully.', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update Petrol Pump record.', error: error.message });
        }
    },

    deletePetrolPumpById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await PetrolPumpService.deletePetrolPumpById(id);
            res.status(200).json({ message: 'Petrol Pump record deleted successfully.', data: result });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete Petrol Pump record.', error: error.message });
        }
    },

    getPetrolPumpByIdAndDate: async (req, res) => {
        const { id, date } = req.params;
        try {
            const petrolPump = await PetrolPumpService.getPetrolPumpByIdAndDate(id, date);
            if (!petrolPump) {
                return res.status(404).json({ message: 'No record found for this pump on this date' });
            }
            res.json(petrolPump);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching record', error: error.message });
        }
    },
};

export default PetrolPumpDetailController;
