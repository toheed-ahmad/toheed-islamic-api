/*
| Default Mosque-style Iqamah Rules
| All values are in minutes after Adhan
*/

function getIqamahRules(type = 'default') {
  const rules = {
    default: {
      fajr: { afterAdhan: 20 },
      dhuhr: { afterAdhan: 15 },
      asr: { afterAdhan: 15 },
      maghrib: { afterAdhan: 5 },
      isha: { afterAdhan: 15 }
    },

    ramadan: {
      fajr: { afterAdhan: 25 },
      dhuhr: { afterAdhan: 15 },
      asr: { afterAdhan: 15 },
      maghrib: { afterAdhan: 3 },
      isha: { afterAdhan: 20 },
      taraweeh: { afterIsha: 20 }
    }
  };

  return rules[type] || rules.default;
}

module.exports = {
  getIqamahRules
};