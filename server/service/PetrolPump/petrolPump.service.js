import PetrolPumpRepository from '../../repository/PetrolPump/petrolPump.repository.js';

const PetrolPumpService = {
    createPetrolPump: async (name, location) => {
        const lastID = await PetrolPumpRepository.getLastPetrolPumpID();
        console.log("Last ID fetched: ", lastID); // Add this line

        let newID;

        if (lastID) {
            const lastNumber = parseInt(lastID.split('-')[1], 10);
            newID = `IOCL-${lastNumber + 1}`;
        } else {
            newID = 'IOCL-1';
        }

        console.log("New ID generated: ", newID); // Add this line

        return await PetrolPumpRepository.insertPetrolPump([newID, name, location]);
    },

    getAllPetrolPumps: async () => {
        return await PetrolPumpRepository.getAllPetrolPumps();
    },

    getPetrolPumpById: async (id) => {
        return await PetrolPumpRepository.getPetrolPumpById(id);
    },

    updatePetrolPump: async (id, name, location) => {
        return await PetrolPumpRepository.updatePetrolPump([name, location, id]);
    },

    deletePetrolPumpById: async (id) => {
        return await PetrolPumpRepository.deletePetrolPumpById(id);
    }
};

export default PetrolPumpService;
