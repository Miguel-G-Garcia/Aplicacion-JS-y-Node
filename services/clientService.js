// Ejemplo en dataService.js
const clientModel = require('../models/clientModel');
const { logMensaje } = require('../utils/logger');

class ClientService {
    getAllClient(callback) {
        clientModel.getAllClient((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    getAllClientListado(callback) {
        clientModel.getAllClientListado((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    async createClient(clientData, callback) {
        // Aquí podrías realizar validaciones adicionales antes de llamar al modelo
        // Por ejemplo, verificar si los datos son válidos antes de intentar crear el client

        clientModel.createClient(clientData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    async updateClient(clientId, clientData, callback) {
        // Aquí podrías realizar validaciones adicionales antes de llamar al modelo
        // Por ejemplo, verificar si los datos son válidos antes de intentar crear el client

        clientModel.updateClient(clientId, clientData, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async getClientById(clientId, callback) {

        clientModel.getClientById(clientId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    async getClientByIdRelations(clientId, callback) {

        clientModel.getClientByIdRelations(clientId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    deleteClient(clientId, callback) {
        clientModel.deleteClient(clientId, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result.affectedRows); // Número de filas afectadas
            }
        });
    }


    // Otros métodos del servicio...
}

module.exports = new ClientService();
