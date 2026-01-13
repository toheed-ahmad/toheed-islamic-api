const express = require('express');
const router = express.Router();

/*
  Aladhan-style Calculation Methods
*/
router.get('/', (req, res) => {
  res.json({
    code: 200,
    status: 'OK',
    data: {
      methods: [
        {
          id: 1,
          name: 'Muslim World League',
          shortName: 'MWL',
          fajrAngle: 18,
          ishaAngle: 17
        },
        {
          id: 2,
          name: 'Islamic Society of North America',
          shortName: 'ISNA',
          fajrAngle: 15,
          ishaAngle: 15
        },
        {
          id: 3,
          name: 'Egyptian General Authority of Survey',
          shortName: 'Egypt',
          fajrAngle: 19.5,
          ishaAngle: 17.5
        },
        {
          id: 4,
          name: 'Umm Al-Qura University, Makkah',
          shortName: 'UmmAlQura',
          fajrAngle: 18.5,
          ishaInterval: 90
        },
        {
          id: 5,
          name: 'University of Islamic Sciences, Karachi',
          shortName: 'Karachi',
          fajrAngle: 18,
          ishaAngle: 18
        }
      ]
    }
  });
});

module.exports = router;