const express = require('express');
const router = express.Router();

const {
  PrayerTimes,
  Coordinates,
  Madhab
} = require('adhan');

const { formatTime } = require('../utils/formatter');
const { getHijriDate } = require('../utils/hijri');
const { getMethod } = require('../utils/methods');
const getTimezone = require('../utils/timezone');
const applyAdjustments = require('../utils/adjustments');

/*
|--------------------------------------------------------------------------
| GET /api/v1/timings
| Query:
| lat, lng (required)
| date=YYYY-MM-DD (optional)
| method (optional)
| school=hanafi|shafi (optional)
| adjustments=fajr:-2,dhuhr:1,asr:0,maghrib:2,isha:2 (optional)
|--------------------------------------------------------------------------
*/
router.get('/', (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const methodId = parseInt(req.query.method || 1);
  const school = req.query.school || 'shafi';
  const dateParam = req.query.date;

  // ✅ Basic validation
  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({
      code: 400,
      status: 'ERROR',
      message: 'lat and lng are required'
    });
  }

  const date = dateParam ? new Date(dateParam) : new Date();
  if (isNaN(date.getTime())) {
    return res.status(400).json({
      code: 400,
      status: 'ERROR',
      message: 'Invalid date format (YYYY-MM-DD)'
    });
  }

  // Prayer method & madhab
  const params = getMethod(methodId);
  params.madhab =
    school.toLowerCase() === 'hanafi'
      ? Madhab.Hanafi
      : Madhab.Shafi;

  const coordinates = new Coordinates(lat, lng);
  const prayerTimes = new PrayerTimes(coordinates, date, params);

  // Base timings
  const baseTimings = {
    Fajr: formatTime(prayerTimes.fajr),
    Sunrise: formatTime(prayerTimes.sunrise),
    Dhuhr: formatTime(prayerTimes.dhuhr),
    Asr: formatTime(prayerTimes.asr),
    Maghrib: formatTime(prayerTimes.maghrib),
    Isha: formatTime(prayerTimes.isha)
  };

  // 🔧 Parse adjustments
  let adjustments = {};
  if (req.query.adjustments) {
    req.query.adjustments.split(',').forEach(item => {
      const [key, value] = item.split(':');
      if (key && !isNaN(value)) {
        adjustments[key.toLowerCase()] = parseInt(value);
      }
    });
  }

  // Apply adjustments
  const finalTimings = applyAdjustments(baseTimings, adjustments);

  res.json({
    code: 200,
    status: 'OK',
    data: {
      timings: finalTimings,
      date: {
        gregorian: date.toISOString().split('T')[0],
        hijri: getHijriDate(date)
      },
      meta: {
        latitude: lat,
        longitude: lng,
        timezone: getTimezone(lat, lng),
        method: methodId,
        school: school,
        adjustments: adjustments
      }
    }
  });
});

module.exports = router;