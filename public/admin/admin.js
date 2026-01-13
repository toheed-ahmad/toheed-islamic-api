function loadStatsPage() {
  fetch('/admin/stats.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('pageContent').innerHTML = html;
    });
}