// Ejemplo en reservationModel.js
const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');

class ReservationModel {
    getAllReservation(callback) {
        const query = 'SELECT * FROM reservation';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Otros métodos del modelo...
}

module.exports = new ReservationModel();
