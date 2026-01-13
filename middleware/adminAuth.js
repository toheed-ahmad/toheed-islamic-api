module.exports = function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'];

  if (token !== 'SECRET_ADMIN_KEY') {
    return res.status(403).json({
      status: 'ERROR',
      message: 'Admin access denied'
    });
  }
  next();
};