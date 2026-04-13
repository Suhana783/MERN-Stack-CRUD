const jwt = require('jsonwebtoken');

exports.checkProfile = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Name, Email and Password are required');
  }

  next();
};

exports.verifyToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if (!header) return res.status(401).send('Access denied');

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.profile = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};