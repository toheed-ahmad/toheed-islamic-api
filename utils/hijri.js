// utils/hijri.js

/**
 * Accurate Hijri date calculation (civil algorithm)
 * No external dependency
 * Node.js 24 compatible
 */

function getHijriDate(date = new Date()) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Julian Day calculation
  const jd =
    Math.floor((1461 * (year + 4800 + Math.floor((month - 14) / 12))) / 4) +
    Math.floor((367 * (month - 2 - 12 * Math.floor((month - 14) / 12))) / 12) -
    Math.floor(
      (3 *
        Math.floor(
          (year + 4900 + Math.floor((month - 14) / 12)) / 100
        )) /
        4
    ) +
    day -
    32075;

  const l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const r = l - 10631 * n + 354;

  const j =
    Math.floor((10985 - r) / 5316) *
      Math.floor((50 * r) / 17719) +
    Math.floor(r / 5670) *
      Math.floor((43 * r) / 15238);

  const r2 =
    r -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;

  const m = Math.floor((24 * r2) / 709);
  const d = r2 - Math.floor((709 * m) / 24);
  const y = 30 * n + j - 30;

  const months = [
    'Muharram',
    'Safar',
    'Rabi al-Awwal',
    'Rabi al-Thani',
    'Jumada al-Awwal',
    'Jumada al-Thani',
    'Rajab',
    'Shaban',
    'Ramadan',
    'Shawwal',
    'Dhul Qadah',
    'Dhul Hijjah'
  ];

  return {
    day: d,
    month: m,
    year: y,
    monthName: months[m - 1],
    format: `${d} ${months[m - 1]} ${y} AH`
  };
}

module.exports = {
  getHijriDate
};