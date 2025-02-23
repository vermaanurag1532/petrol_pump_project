import connection from '../../db/connection.js';

const PetrolPumpRepository = {
    createPetrolPump: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Petrol Pump Detail\` (
                    petrolPumpID, 
                    VehicleID, 
                    EnteringTime, 
                    ExitTime, 
                    FillingTime, 
                    Date,
                    ServerConnected
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            connection.query(query, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getAllPetrolPumps: () => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    petrolPumpID, 
                    VehicleID, 
                    EnteringTime, 
                    ExitTime, 
                    FillingTime, 
                    Date,
                    ServerConnected
                FROM \`Petrol Pump Detail\`
            `;
            connection.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getPetrolPumpById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    petrolPumpID, 
                    VehicleID, 
                    EnteringTime, 
                    ExitTime, 
                    FillingTime, 
                    Date,
                    ServerConnected
                FROM \`Petrol Pump Detail\`
                WHERE petrolPumpID = ?
            `;
            connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0] || null);
            });
        });
    },

    getPetrolPumpByIdAndDate: (id, date) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 
                    petrolPumpID, 
                    VehicleID, 
                    EnteringTime, 
                    ExitTime, 
                    FillingTime, 
                    Date,
                    ServerConnected
                FROM \`Petrol Pump Detail\`
                WHERE petrolPumpID = ? AND Date = ?
            `;
            connection.query(query, [id, date], (err, results) => {
                if (err) reject(err);
                else resolve(results[0] || null);
            });
        });
    },

    updatePetrolPump: (petrolPumpID, vehicleID, exitTime, fillingTime, serverConnected) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE \`Petrol Pump Detail\`
                SET  
                    ExitTime = ?, 
                    FillingTime = ?,
                    ServerConnected = ?
                WHERE petrolPumpID = ? AND VehicleID = ?
            `;
            connection.query(query, [exitTime, fillingTime, serverConnected, petrolPumpID, vehicleID], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    deletePetrolPumpById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM \`Petrol Pump Detail\`
                WHERE petrolPumpID = ?
            `;
            connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },
};

export default PetrolPumpRepository;