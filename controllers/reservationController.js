// reservationController.js
const reservationService = require('../services/reservationService');
const Respuesta = require('../utils/respuesta');

class ReservationController {

  async getAllReservation(req, res) {
    // Implementa la lógica para obtener todos los datos 
    reservationService.getAllReservation((err, data) => {
      if (err) {
        res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
      } else {
        res.json(Respuesta.exito(data, 'Datos de reservations recuperados'));
      }
    });
  };


  async getReservationById(req, res) {
    // Implementa la lógica para obtener un dato por ID
  };

  async createReservation(req, res) {
    // Implementa la lógica para crear un nuevo dato
  };

  async updateReservation(req, res) {
    // Implementa la lógica para actualizar un dato por ID
  };

  async deleteReservation(req, res) {
    // Implementa la lógica para eliminar un dato por ID
  };
}

module.exports = new ReservationController();
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
