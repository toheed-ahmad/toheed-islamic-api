let devMode = false;

function toggleDevMode() {
  devMode = document.getElementById('devMode').checked;
  document.getElementById('jsonView').classList.toggle('hidden', !devMode);
}

function loadPage(type) {
  document.getElementById('pageTitle').innerText = type.toUpperCase();
  const apiUrl = `/api/v1/${type}`;

  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      document.getElementById('pageContent').innerHTML = `
        <h3>Preview</h3>
        <p>Total Records: ${Array.isArray(data) ? data.length : 1}</p>
      `;

      if (devMode) {
        document.getElementById('jsonView').textContent =
          JSON.stringify(data, null, 2);
      }
    });
}