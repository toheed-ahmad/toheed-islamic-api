const fs = require('fs');
const path = require('path');
const generateId = require('../utils/idGenerator');

const DATA_PATH = path.join(__dirname, '../data/virtues.json');

function readData() {
  return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

/* GET (Public) */
exports.getVirtues = (req, res) => {
  const { type, prayer } = req.query;
  let data = readData().virtues.filter(v => v.active);

  if (type) data = data.filter(v => v.type === type);
  if (prayer) data = data.filter(v => v.prayer === prayer);

  res.json({ status: 'OK', data });
};

/* POST (Admin) */
exports.createVirtue = (req, res) => {
  const db = readData();

  const virtue = {
    id: generateId(req.body.type),
    ...req.body,
    active: true,
    createdAt: new Date().toISOString()
  };

  db.virtues.push(virtue);
  writeData(db);

  res.json({ status: 'CREATED', data: virtue });
};

/* PUT (Admin) */
exports.updateVirtue = (req, res) => {
  const { id } = req.params;
  const db = readData();

  const index = db.virtues.findIndex(v => v.id === id);
  if (index === -1) {
    return res.status(404).json({ status: 'NOT_FOUND' });
  }

  db.virtues[index] = { ...db.virtues[index], ...req.body };
  writeData(db);

  res.json({ status: 'UPDATED', data: db.virtues[index] });
};

/* DELETE (Admin) */
exports.deleteVirtue = (req, res) => {
  const db = readData();
  db.virtues = db.virtues.filter(v => v.id !== req.params.id);
  writeData(db);

  res.json({ status: 'DELETED' });
};