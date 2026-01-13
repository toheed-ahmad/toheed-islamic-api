function applyAdjustments(timings, adjustments = {}) {
  const result = {};

  for (const prayer in timings) {
    const base = timings[prayer];
    const adjust = adjustments[prayer] || 0;
    result[prayer] = base + adjust * 60000;
  }

  return result;
}

module.exports = applyAdjustments;