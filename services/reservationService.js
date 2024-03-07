// reservationService.js
const reservationModel = require('../models/reservationModel');

class ReservationService {
    getAllReservation(callback) {
        reservationModel.getAllReservation((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    // Otros métodos del servicio...
}

module.exports = new ReservationService();
