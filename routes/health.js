const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Prayer API',
    apiType: 'Public & Admin',
    serverTime: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'API is running successfully'
  });
});

module.exports = router;