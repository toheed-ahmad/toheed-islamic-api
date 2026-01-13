const express = require('express');
const router = express.Router();
const { getRamadanInfo } = require('../utils/ramadanHelper');

/*
|--------------------------------------------------------------------------
| GET /api/v1/ramadan
|--------------------------------------------------------------------------
*/
router.get('/', (req, res) => {
  const timings = req.query;

  if (!timings.Fajr || !timings.Maghrib) {
    return res.status(400).json({
      code: 400,
      status: 'ERROR',
      message: 'Fajr and Maghrib timings required'
    });
  }

  res.json({
    code: 200,
    status: 'OK',
    data: getRamadanInfo(new Date(), timings)
  });
});

module.exports = router;