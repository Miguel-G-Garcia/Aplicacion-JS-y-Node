// Ejemplo en clientModel.js
const db = require('../config/dbConfig');
const { logErrorSQL, logMensaje } = require('../utils/logger');

class ClientModel {
    getAllClient(callback) {
        const query = 'SELECT * FROM client';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    getAllClientListado(callback) {
        const query = 'SELECT c.* FROM client c';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }


    getClientById(clientId, callback) {
        const query = 'SELECT * FROM client WHERE client_id = ?';
        db.query(query, [clientId], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, null);
            } else {
                const client = result[0];
                callback(null, client);
            }
        });
    }

    getClientByIdRelations(clientId, callback) {
        const query = 'SELECT c.*,t.reservation,t.descripcion as reservationdesc FROM client as c, reservation as t WHERE c.idreservation = t.idreservation AND idclient = ?';
        db.query(query, [clientId], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else if (result.length === 0) {
                callback(null, null);
            } else {
                const client = result[0];
                callback(null, client);
            }
        });
    }

    async createClient(clientData,callback) {
        // Atencion, idclient es PK y es Auto Incremental, se pone como null
        const query = 'INSERT INTO client (client_name , address, phone_number, gmail) VALUES (?, ?, ?, ?)';
        const values = [clientData.client_name, clientData.address, clientData.phone_number, clientData.gmail];

        const result = db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    
    async updateClient(clientId, clientData, callback) {
        // Atencion, idclient es PK y es Auto Incremental, se pone como null
        const query = 'UPDATE client SET client_name = ?, address = ?, phone_number = ?, gmail = ? WHERE client_id = ?;';        
        
        const values = [clientData.client_name, clientData.address, clientData.phone_number, clientData.gmail, clientId];

        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteClient(clientId, callback) {
        const query = 'DELETE FROM client WHERE client_id = ?';
        db.query(query, [clientId], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Otros métodos del modelo...
}

module.exports = new ClientModel();

// Estructura de result (mysql)
// {
//   fieldCount: 0,
//   affectedRows: 1, // Número de filas afectadas por la consulta
//   insertId: 1,    // ID generado por la operación de inserción
//   serverStatus: 2,
//   warningCount: 0,
//   message: '',
//   protocol41: true,
//   changedRows: 0  // Número de filas cambiadas por la consulta
// }

