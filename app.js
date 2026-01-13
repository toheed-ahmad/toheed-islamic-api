const express = require('express');
const path = require('path');

/* =========================
   INIT EXPRESS APP  ✅
========================= */
const app = express();

/* =========================
   API Stats Middleware
========================= */
const apiStats = require('./middleware/apiStats');

/* =========================
   Global Headers (Branding)
========================= */
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Toheed Islamic API');
  res.setHeader('X-API-Version', 'v1');
  next();
});

/* =========================
   Middlewares
========================= */
app.use(express.json());

/* =========================
   API Stats (ONLY API ROUTES)
========================= */
app.use('/api', apiStats);

/* =========================
   Static Files
========================= */
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));

/* =========================
   API Routes (v1)
========================= */
app.use('/api/v1/quran', require('./routes/quran'));
app.use('/api/v1/names', require('./routes/names'));
app.use('/api/v1/timings', require('./routes/timings'));
app.use('/api/v1/calendar', require('./routes/calendar'));
app.use('/api/v1/qibla', require('./routes/qibla'));
app.use('/api/v1/methods', require('./routes/methods'));
app.use('/api/v1/iqamah', require('./routes/iqamah'));
app.use('/api/v1/ramadan', require('./routes/ramadan'));
app.use('/api/v1/virtues', require('./routes/virtues'));
app.use('/api/v1/stats', require('./routes/stats'));
app.use('/health', require('./routes/health'));

/* =========================
   API Dashboard
========================= */
app.get('/dashboard', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Prayer API Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { margin:0;font-family:Segoe UI,Arial;background:#f4f6f8;color:#333 }
    header { background:#1e3a5f;color:#fff;padding:16px 20px;font-size:20px }
    .container {
      padding:20px;
      display:grid;
      grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
      gap:20px;
    }
    .card {
      background:#fff;
      border-radius:10px;
      padding:16px;
      box-shadow:0 4px 10px rgba(0,0,0,0.08);
    }
    .btn {
      display:block;
      margin-top:10px;
      padding:10px;
      text-align:center;
      background:#0066cc;
      color:#fff;
      border-radius:6px;
      text-decoration:none;
      font-size:14px;
    }
    .btn.secondary { background:#2c7be5 }
    .btn.gray { background:#6c757d }
    .status {
      display:inline-block;
      padding:4px 8px;
      border-radius:12px;
      font-size:12px;
      background:#28a745;
      color:#fff;
    }
  </style>
</head>
<body>

<header>🕌 Prayer API Dashboard</header>

<div class="container">

  <div class="card">
    <h3>📿 Prayer Times</h3>
    <a class="btn" href="/api/v1/timings?lat=28.61&lng=77.20">Today</a>
    <a class="btn secondary" href="/api/v1/calendar?lat=28.61&lng=77.20&year=2026&month=1">Monthly</a>
  </div>

  <div class="card">
    <h3>📊 API Stats</h3>
    <a class="btn secondary" href="/api/v1/stats">View Usage</a>
  </div>

  <div class="card">
    <h3>⚙️ System</h3>
    <span class="status">API Online</span>
    <a class="btn gray" href="/health">Health</a>
  </div>

</div>

<footer style="text-align:center;padding:12px;font-size:13px;color:#777">
  Toheed Islamic API • Ready for Flutter App
</footer>

</body>
</html>
`);
});

/* =========================
   Root Redirect
========================= */
app.get('/', (req, res) => {
  res.redirect('/admin');
});

/* =========================
   Server Start
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Toheed Islamic API → http://localhost:${PORT}`);
  console.log(`✅ Dashboard         → http://localhost:${PORT}/dashboard`);
  console.log(`✅ Admin Panel       → http://localhost:${PORT}/admin`);
});