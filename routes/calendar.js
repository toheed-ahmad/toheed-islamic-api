const express = require('express');
const router = express.Router();

const {
  PrayerTimes,
  Coordinates,
  Madhab
} = require('adhan');

const { formatTime } = require('../utils/formatter');
const { getMethod } = require('../utils/methods');
const { getHijriDate } = require('../utils/hijri');
const getTimezone = require('../utils/timezone');

/*
|--------------------------------------------------------------------------
| GET /api/v1/calendar
|--------------------------------------------------------------------------
*/
router.get('/', (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const year = parseInt(req.query.year);
  const month = parseInt(req.query.month); // 1–12
  const methodId = parseInt(req.query.method || 1);
  const school = req.query.school || 'shafi';

  if (
    isNaN(lat) ||
    isNaN(lng) ||
    isNaN(year) ||
    isNaN(month)
  ) {
    return res.status(400).json({
      code: 400,
      status: 'ERROR',
      message: 'lat, lng, year and month are required'
    });
  }

  const coordinates = new Coordinates(lat, lng);

  const params = getMethod(methodId);
  params.madhab =
    school.toLowerCase() === 'hanafi'
      ? Madhab.Hanafi
      : Madhab.Shafi;

  const daysInMonth = new Date(year, month, 0).getDate();
  const calendar = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const prayerTimes = new PrayerTimes(
      coordinates,
      date,
      params
    );

    calendar.push({
      date: {
        gregorian: date.toISOString().split('T')[0],
        hijri: getHijriDate(date)
      },
      timings: {
        Fajr: formatTime(prayerTimes.fajr),
        Sunrise: formatTime(prayerTimes.sunrise),
        Dhuhr: formatTime(prayerTimes.dhuhr),
        Asr: formatTime(prayerTimes.asr),
        Maghrib: formatTime(prayerTimes.maghrib),
        Isha: formatTime(prayerTimes.isha)
      }
    });
  }

  res.json({
    code: 200,
    status: 'OK',
    data: {
      meta: {
        latitude: lat,
        longitude: lng,
        timezone: getTimezone(lat, lng),
        method: methodId,
        school: school,
        month: month,
        year: year,
        totalDays: daysInMonth
      },
      calendar: calendar
    }
  });
});

module.exports = router;