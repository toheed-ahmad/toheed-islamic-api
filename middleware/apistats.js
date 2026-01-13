const fs = require('fs');
const path = require('path');

const STATS_FILE = path.join(__dirname, '../data/api-stats.json');

function loadStats() {
  if (!fs.existsSync(STATS_FILE)) {
    return {
      totalRequests: 0,
      endpoints: {},
      lastRequest: null,
      startedAt: new Date().toISOString()
    };
  }
  return JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
}

function saveStats(stats) {
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
}

module.exports = (req, res, next) => {
  const stats = loadStats();

  stats.totalRequests += 1;
  stats.lastRequest = new Date().toISOString();

  const endpoint = req.path;
  stats.endpoints[endpoint] = (stats.endpoints[endpoint] || 0) + 1;

  saveStats(stats);
  next();
};