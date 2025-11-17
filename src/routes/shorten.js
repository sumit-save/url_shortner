
const express = require('express');
const Url = require('../models/Url');
const shortIdService = require('../services/shortId');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/shorten',
  body('longUrl').isURL({ protocols: ['http','https'], require_protocol: true }),
  async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { longUrl } = req.body;
    let shortId = shortIdService.generate();

    const doc = new Url({ shortId, longUrl });
    await doc.save();

    const baseUrl = `${req.protocol}://${req.get('host')}`;
    res.json({ shortId, shortUrl: `${baseUrl}/${shortId}` });
  }
);

module.exports = router;
