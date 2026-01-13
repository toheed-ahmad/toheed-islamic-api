const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const BASE_DIR = path.join(__dirname, '../names');

/* =========================
   Letters list
========================= */
router.get('/letters', (req, res) => {
  const file = path.join(BASE_DIR, 'meta/letters.json');
  res.json(JSON.parse(fs.readFileSync(file, 'utf8')));
});

/* =========================
   Names by gender + letter
========================= */
router.get('/:gender/:letter', (req, res) => {
  const { gender, letter } = req.params;
  const filePath = path.join(BASE_DIR, gender, `${letter}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Names not found' });
  }

  res.json(JSON.parse(fs.readFileSync(filePath, 'utf8')));
});

module.exports = router;