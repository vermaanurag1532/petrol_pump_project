import PetrolPumpRepository from '../../repository/PetrolPump/detail.repository.js';

const PetrolPumpService = {
    createPetrolPump: async (petrolPumpID, vehicleID, enteringTime, exitTime, fillingTime, date) => {
        return await PetrolPumpRepository.insertPetrolPump([
            petrolPumpID,
            vehicleID,
            enteringTime,
            exitTime,
            fillingTime,
            date
        ]);
    },

    getAllPetrolPumps: async () => {
        return await PetrolPumpRepository.getAllPetrolPumps();
    },

    getPetrolPumpById: async (id) => {
        return await PetrolPumpRepository.getPetrolPumpById(id);
    },

    updatePetrolPump: async (petrolPumpID, vehicleID, exitTime, fillingTime) => {
        return await PetrolPumpRepository.updatePetrolPump({
            petrolPumpID,
            vehicleID,
            exitTime,
            fillingTime
        });
    },
    

    deletePetrolPumpById: async (id) => {
        return await PetrolPumpRepository.deletePetrolPumpById(id);
    },

    getPetrolPumpByIdAndDate: async (petrolPumpID, date) => {
        return await PetrolPumpRepository.getPetrolPumpByIdAndDate(petrolPumpID, date);
    },
};

export default PetrolPumpService;
