const express = require('express');
const router = express.Router();

// Importing the controller logic you just wrote
const videoController = require('../controllers/videoController');

/**
 * @route   POST /api/videos/fetch
 * @desc    Extract videoId from URL, fetch transcript, and save to DB
 */
router.post('/fetch', videoController.fetchAndSaveTranscript);

/**
 * @route   GET /api/videos/search
 * @desc    Search for a keyword within the saved transcripts
 */
router.get('/search', videoController.searchTranscript);

module.exports = router;