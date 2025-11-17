const express = require('express');
const Url = require('../models/Url');
const router = express.Router();

router.get('/:shortId', async (req, res) => {
  const item = await Url.findOne({ shortId: req.params.shortId });
  if (!item) return res.status(404).send('Not found');

  const clickData = {
    ip: req.headers['x-forwarded-for']?.split(',')[0] || req.ip,
    userAgent: req.headers['user-agent'],
    referrer: req.headers['referer'] || req.headers['referrer'] || null,
    timestamp: new Date()
  };

  item.clickCount++;
  item.clickHistory.push(clickData);
  await item.save();

  return res.redirect(item.longUrl);
});

module.exports = router;
