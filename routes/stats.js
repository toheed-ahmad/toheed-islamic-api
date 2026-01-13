const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const STATS_FILE = path.join(__dirname, '../data/api-stats.json');

router.get('/', (req, res) => {
  if (!fs.existsSync(STATS_FILE)) {
    return res.json({ message: 'No stats available yet' });
  }
  res.json(JSON.parse(fs.readFileSync(STATS_FILE, 'utf8')));
});

router.delete('/reset', (req, res) => {
  fs.unlinkSync(STATS_FILE);
  res.json({ status: 'OK', message: 'Stats reset successfully' });
});

module.exports = router;