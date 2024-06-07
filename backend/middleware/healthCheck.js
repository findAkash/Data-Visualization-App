const router = require('express').Router();

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is up and running !' });
});

module.exports = router;
