// clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.getAllClient);
router.get('/:id', clientController.getClientById);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
