const express = require('express');
const router = express.Router();
const { getIqamahRules } = require('../utils/iqamahRules');

/*
|--------------------------------------------------------------------------
| GET /api/v1/iqamah
| Query: type=default | ramadan
|--------------------------------------------------------------------------
*/
router.get('/', (req, res) => {
  const type = req.query.type || 'default';

  res.json({
    code: 200,
    status: 'OK',
    data: {
      type,
      rules: getIqamahRules(type)
    }
  });
});

module.exports = router;