const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const { addCracker, getCrackers, updateCracker, deleteCracker, getCracker } = require('../controllers/crackerController');

router.post('/', protect, adminOnly, addCracker);
router.get('/', getCrackers);
router.get('/:id', getCracker);
router.put('/:id', protect, adminOnly, updateCracker);
router.delete('/:id', protect, adminOnly, deleteCracker);

module.exports = router;