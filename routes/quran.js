const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

/* =========================
   Base Quran Directory
========================= */
const QURAN_DIR = path.join(__dirname, '../quran');

/* =========================
   Helpers
========================= */
function getSurahFile(dir, number) {
  const surahNum = String(number).padStart(3, '0');
  return path.join(dir, `${surahNum}.json`);
}

function sendJson(res, filePath, errorMsg) {
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: errorMsg });
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(data);
}

/* =========================
   📖 Arabic Quran
   GET /api/v1/quran/surah/1
========================= */
router.get('/surah/:number', (req, res) => {
  const filePath = getSurahFile(
    path.join(QURAN_DIR, 'arbic'),
    req.params.number
  );

  sendJson(res, filePath, 'Surah (Arabic) not found');
});

/* =========================
   🌍 Translation
   GET /api/v1/quran/translation/urdu/mufti-shafi/1
========================= */
router.get('/translation/:lang/:source/:number', (req, res) => {
  const { lang, source, number } = req.params;

  const filePath = getSurahFile(
    path.join(QURAN_DIR, 'translations', lang, source),
    number
  );

  sendJson(res, filePath, 'Translation not found');
});

/* =========================
   📚 Tafseer
   GET /api/v1/quran/tafseer/maariful-quran/1
========================= */
router.get('/tafseer/:source/:number', (req, res) => {
  const { source, number } = req.params;

  const filePath = getSurahFile(
    path.join(QURAN_DIR, 'tafseer', source),
    number
  );

  sendJson(res, filePath, 'Tafseer not found');
});

/* =========================
   📋 Meta Data
========================= */

// GET /api/v1/quran/meta/surah-list
router.get('/meta/surah-list', (req, res) => {
  sendJson(
    res,
    path.join(QURAN_DIR, 'meta/surah-list.json'),
    'Surah list not found'
  );
});

// GET /api/v1/quran/meta/juz-list
router.get('/meta/juz-list', (req, res) => {
  sendJson(
    res,
    path.join(QURAN_DIR, 'meta/juz-list.json'),
    'Juz list not found'
  );
});

module.exports = router;