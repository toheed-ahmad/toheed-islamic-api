const { getHijriDate } = require('./hijri');

function isRamadan(date = new Date()) {
  const hijri = getHijriDate(date);
  return hijri.month === 9;
}

function getRamadanInfo(date = new Date(), timings) {
  return {
    isRamadan: isRamadan(date),
    sehriEnds: timings.Fajr,
    iftar: timings.Maghrib
  };
}

module.exports = {
  isRamadan,
  getRamadanInfo
};