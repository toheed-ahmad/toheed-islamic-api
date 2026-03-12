const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Quran PDFs کا پاتھ
const quranDir = path.join(__dirname, '../public/quran');

// 1. تمام پاروں کی لسٹ دیکھیں
router.get('/juz', (req, res) => {
    try {
        const juzList = [];
        for (let i = 1; i <= 30; i++) {
            juzList.push({
                juz: i,
                file: `juz${i}.pdf`,
                url: `/api/v1/quran-pdf/juz/${i}`,
                download: `/api/v1/quran-pdf/juz/${i}/download`
            });
        }
        
        res.json({
            success: true,
            total: 30,
            data: juzList
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 2. مخصوص پارہ دیکھیں (براؤزر میں)
router.get('/juz/:number', (req, res) => {
    const juzNumber = parseInt(req.params.number);
    
    if (juzNumber < 1 || juzNumber > 30) {
        return res.status(404).send('پارہ نمبر 1 سے 30 کے درمیان ہونا چاہیے');
    }
    
    const pdfPath = path.join(quranDir, `juz${juzNumber}.pdf`);
    
    // چیک کریں کہ فائل موجود ہے
    if (!fs.existsSync(pdfPath)) {
        return res.status(404).send('PDF فائل نہیں ملی');
    }
    
    res.sendFile(pdfPath);
});

// 3. PDF ڈاؤن لوڈ کریں
router.get('/juz/:number/download', (req, res) => {
    const juzNumber = parseInt(req.params.number);
    
    if (juzNumber < 1 || juzNumber > 30) {
        return res.status(404).json({ 
            success: false, 
            error: 'پارہ نمبر 1 سے 30 کے درمیان ہونا چاہیے' 
        });
    }
    
    const pdfPath = path.join(quranDir, `juz${juzNumber}.pdf`);
    
    if (!fs.existsSync(pdfPath)) {
        return res.status(404).json({ 
            success: false, 
            error: 'PDF فائل نہیں ملی' 
        });
    }
    
    res.download(pdfPath, `Quran-Juz${juzNumber}.pdf`);
});

// 4. مخصوص آیت والا پارہ تلاش کریں
router.get('/surah/:surahNumber/ayah/:ayahNumber', (req, res) => {
    // یہاں آپ کو ایک میپنگ فائل کی ضرورت ہوگی
    // جو بتائے کہ کونسی آیت کس پارے میں ہے
    res.json({
        success: true,
        message: "یہ فیچر جلد آرہا ہے - اس کے لیے ڈیٹا بیس درکار ہے"
    });
});

module.exports = router;