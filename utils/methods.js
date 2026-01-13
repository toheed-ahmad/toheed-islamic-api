const { CalculationMethod } = require('adhan');

function getMethod(id) {
  switch (parseInt(id)) {
    case 2:
      return CalculationMethod.Karachi();
    case 3:
      return CalculationMethod.NorthAmerica(); // ISNA
    case 4:
      return CalculationMethod.UmmAlQura();
    case 5:
      return CalculationMethod.Egyptian();
    default:
      return CalculationMethod.MuslimWorldLeague(); // 1
  }
}

module.exports = { getMethod };