const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const controller = require('../controllers/virtuesController');

/* Public */
router.get('/', controller.getVirtues);

/* Admin */
router.post('/', adminAuth, controller.createVirtue);
router.put('/:id', adminAuth, controller.updateVirtue);
router.delete('/:id', adminAuth, controller.deleteVirtue);

module.exports = router;