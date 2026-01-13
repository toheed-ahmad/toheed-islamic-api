const cache = {};

function setCache(key, data, ttl = 60) {
  cache[key] = {
    data,
    expiry: Date.now() + ttl * 1000
  };
}

function getCache(key) {
  if (!cache[key]) return null;
  if (Date.now() > cache[key].expiry) {
    delete cache[key];
    return null;
  }
  return cache[key].data;
}

module.exports = { setCache, getCache };