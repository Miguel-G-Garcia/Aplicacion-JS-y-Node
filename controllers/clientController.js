// clientController.js
const clientService = require('../services/clientService');
const { logMensaje } = require('../utils/logger');
const Respuesta = require('../utils/respuesta');

class ClientController {

  async getAllClient(req, res) {

    // Recuperar información de los parámetros de la petición
    const { listado } = req.query;

    // Si se trata de un listado (existe el parámetro listado), invoco otro servicio
    if (listado) {
      clientService.getAllClientListado((err, data) => {
        if (err) {
          res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
        } else {
          res.json(Respuesta.exito(data, 'Listado de clients recuperado'));
        }
      });
    } else { // No se trata de un listado
      // Implementa la lógica para obtener todos los datos 
      clientService.getAllClient((err, data) => {
        if (err) {
          res.status(500).json(Respuesta.error(data, 'Error al recuperar los datos:' + req.originalUrl));
        } else {
          res.json(Respuesta.exito(data, 'Datos de clients recuperados'));
        }
      });
    }
  };

  async getClientById(req, res) {
    // Implementa la lógica para obtener un dato por ID
    // Recuperar información de los parámetros de la petición
    const { relations } = req.query;
    // Recuperar información que vienen en la ruta '/:id'
    const clientId = req.params.id;

    // Si hay que recuperar los datos relacionados (relations), invoco otro servicio
    if (relations) {

      clientService.getClientByIdRelations(clientId, (err, client) => {
        if (err) {
          res.status(500).json(Respuesta.error(client, 'Error al recuperar los datos:' + req.originalUrl));
        } else if (client == null) {
          logMensaje("Respuesta es:" + JSON.stringify(Respuesta.error(client, 'Client no encontrado' + req.originalUrl)))
          res.status(404).json(Respuesta.error(client, 'Client no encontrado: ' + clientId));
        } else {
          res.json(Respuesta.exito(client, 'Client recuperado'));
        }
      });
    } else { // No necesito recuperar datos relacionados

      // Implementa la lógica para obtener el client
      clientService.getClientById(clientId, (err, client) => {
        if (err) {
          res.status(500).json(Respuesta.error(client, 'Error al recuperar los datos:' + req.originalUrl));
        } else if (client == null) {
          res.status(404).json(Respuesta.error(client, 'Client no encontrado: ' + clientId));
        } else {
          res.json(Respuesta.exito(client, 'Client recuperado'));
        }
      });
    }
  };

  async createClient(req, res) {
    // Implementa la lógica para crear un nuevo dato
    // Recuperar objeto con el client a dar de alta
    const clientData = req.body;
   // logMensaje(req)

    clientService.createClient(clientData, (err, result) => {
      if (err) {
        res.status(500).json(Respuesta.error(result, 'Error al insertar el client:' + req.originalUrl));
      } else {
        // 201: Created
        res.status(201).json(Respuesta.exito({ insertId: result.insertId }, 'Client dado de alta'));
      }
    });


  };

  async updateClient(req, res) {
    // Implementa la lógica para actualizar un dato por ID
     // Implementa la lógica para eliminar un dato por ID
    // Recuperar información que vienen en la ruta '/:id'
    const clientId = req.params.id;
    
    const clientData = req.body;

    // Implementa la lógica para eliminar el client
    clientService.updateClient(clientId, clientData, (err, result) => {
      if (err) {
          console.error('Error al modificar el cliente:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
      // } else if (result === 0) {
      //     res.status(404).json({ error: 'Client no encontrado' });
      } else {
        res.status(201).json(Respuesta.exito({ insertId: result.insertId }, 'Cliente modificado'));
      }
  });
  };

  async deleteClient(req, res) {
    // Implementa la lógica para eliminar un dato por ID
    // Recuperar información que vienen en la ruta '/:id'
    const clientId = req.params.id;
    // Implementa la lógica para eliminar el client
    clientService.deleteClient(clientId, (err, result) => {
      if (err) {
          console.error('Error al eliminar client:', err);
          res.status(500).json({ error: 'Error interno del servidor' });
      // } else if (result === 0) {
      //     res.status(404).json({ error: 'Client no encontrado' });
      } else {
          res.status(204).end(); // 204: No Content
      }
  });

  };

}

module.exports = new ClientController();
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
