import PetrolPumpRepository from '../../repository/PetrolPump/detail.repository.js';

const PetrolPumpService = {
    createPetrolPump: async (data) => {
        try {
            const result = await PetrolPumpRepository.createPetrolPump([
                data.petrolPumpID,
                data.VehicleID,
                data.EnteringTime,
                data.ExitTime,
                data.FillingTime,
                data.Date,
                data.ServerConnected
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getAllPetrolPumps: async () => {
        try {
            const result = await PetrolPumpRepository.getAllPetrolPumps();
            return result;
        } catch (error) {
            throw error;
        }
    },

    getPetrolPumpById: async (id) => {
        try {
            const result = await PetrolPumpRepository.getPetrolPumpById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getPetrolPumpByIdAndDate: async (id, date) => {
        try {
            const result = await PetrolPumpRepository.getPetrolPumpByIdAndDate(id, date);
            return result;
        } catch (error) {
            throw error;
        }
    },

    updatePetrolPump: async (petrolPumpID, vehicleID, exitTime, fillingTime, serverConnected) => {
        try {
            const result = await PetrolPumpRepository.updatePetrolPump(
                petrolPumpID,
                vehicleID,
                exitTime,
                fillingTime,
                serverConnected
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    deletePetrolPumpById: async (id) => {
        try {
            const result = await PetrolPumpRepository.deletePetrolPumpById(id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};

export default PetrolPumpService;