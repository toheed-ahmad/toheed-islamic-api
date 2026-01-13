const express = require('express');
const router = express.Router();

const { Coordinates, Qibla } = require('adhan');
const getTimezone = require('../utils/timezone');

/*
|--------------------------------------------------------------------------
| GET /api/v1/qibla
| Query: lat, lng (required)
|--------------------------------------------------------------------------
*/
router.get('/', (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);

  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({
      code: 400,
      status: 'ERROR',
      message: 'lat and lng are required'
    });
  }

  const coordinates = new Coordinates(lat, lng);
  const bearing = Qibla(coordinates); // degrees from North

  res.json({
    code: 200,
    status: 'OK',
    data: {
      latitude: lat,
      longitude: lng,
      timezone: getTimezone(lat, lng),
      qibla_direction: {
        bearing: Number(bearing.toFixed(2)),
        description: 'Degrees clockwise from North'
      }
    }
  });
});

module.exports = router;