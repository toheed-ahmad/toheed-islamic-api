module.exports = function generateId(prefix = 'virtue') {
  return `${prefix}_${Date.now()}`;
};