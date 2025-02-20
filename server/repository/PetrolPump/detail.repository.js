import connection from '../../db/connection.js';

const PetrolPumpRepository = {
    insertPetrolPump: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Petrol Pump Detail\` (
                    \`PetrolPumpID\`, 
                    \`VehicleID\`, 
                    \`EnteringTime\`, 
                    \`ExitTime\`, 
                    \`FillingTime\`, 
                    \`Date\`
                ) VALUES (?, ?, ?, ?, ?, ?)
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
                    \`PetrolPump ID\`, 
                    \`VehicleID\`, 
                    \`EnteringTime\`, 
                    \`ExitTime\`, 
                    \`FillingTime\`, 
                    \`Date\`
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
                    \`PetrolPumpID\`, 
                    \`VehicleID\`, 
                    \`EnteringTime\`, 
                    \`ExitTime\`, 
                    \`FillingTime\`, 
                    \`Date\`
                FROM \`Petrol Pump Detail\`
                WHERE \`PetrolPumpID\` = ?
            `;
            connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results || null);
            });
        });
    },

    updatePetrolPump: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE \`Petrol Pump Detail\`
                SET  
                    \`ExitTime\` = ?, 
                    \`FillingTime\` = ?
                WHERE \`VehicleID\` = ? AND \`PetrolPumpID\` = ?
            `;
            const values = [params.exitTime, params.fillingTime, params.vehicleID, params.petrolPumpID];
            connection.query(query, values, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    deletePetrolPumpById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM \`Petrol Pump Detail\`
                WHERE \`PetrolPumpID\` = ?
            `;
            connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getPetrolPumpByIdAndDate: (petrolPumpID, date) => {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT \`Petrol Pump ID\`, \`Vehicle ID\`, \`Entering Time\`, \`Exit Time\`, 
                       \`Filling Time\`, \`Date\`
                FROM \`Petrol Pump\`
                WHERE \`Petrol Pump ID\` = ? AND \`Date\` = ?
            `;
            connection.query(query, [petrolPumpID, date], (err, results) => {
                if (err) reject(err);
                else resolve(results || null); // Return the record or null if not found
            });
        });
    },
};

export default PetrolPumpRepository;
