import connection from '../../db/connection.js';

const PetrolPumpRepository = {
    insertPetrolPump: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO \`Petrol Pump Detail\` (
                    \`Petrol Pump ID\`, 
                    \`Vehicle ID\`, 
                    \`Entering Time\`, 
                    \`Exit Time\`, 
                    \`Filling Time\`, 
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
                    \`Petrol Pump ID\`, 
                    \`Vehicle ID\`, 
                    \`Entering Time\`, 
                    \`Exit Time\`, 
                    \`Filling Time\`, 
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
                    \`Petrol Pump ID\`, 
                    \`Vehicle ID\`, 
                    \`Entering Time\`, 
                    \`Exit Time\`, 
                    \`Filling Time\`, 
                    \`Date\`
                FROM \`Petrol Pump Detail\`
                WHERE \`Petrol Pump ID\` = ?
            `;
            connection.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0] || null);
            });
        });
    },

    updatePetrolPump: (params) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE \`Petrol Pump Detail\`
                SET 
                    \`Vehicle ID\` = ?, 
                    \`Entering Time\` = ?, 
                    \`Exit Time\` = ?, 
                    \`Filling Time\` = ?, 
                    \`Date\` = ?
                WHERE \`Petrol Pump ID\` = ?
            `;
            connection.query(query, params, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    deletePetrolPumpById: (id) => {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE FROM \`Petrol Pump Detail\`
                WHERE \`Petrol Pump ID\` = ?
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
                else resolve(results[0] || null); // Return the record or null if not found
            });
        });
    },
};

export default PetrolPumpRepository;
