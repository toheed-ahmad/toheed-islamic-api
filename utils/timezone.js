const geoTz = require('geo-tz');

/**
 * Auto detect timezone from latitude & longitude
 * Safe fallback included
 */
function getTimezone(lat, lng) {
  try {
    const timezones = geoTz.find(lat, lng);

    if (timezones && timezones.length > 0) {
      return timezones[0]; // e.g. "Asia/Kolkata"
    }

    return 'UTC';
  } catch (error) {
    return 'UTC';
  }
}

module.exports = getTimezone;