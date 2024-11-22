const express = require('express');
const router = express.Router();

// Placeholder route for doctor
router.get('/doctor-placeholder', (req, res) => {
    res.status(200).send({ message: 'Doctor route placeholder', success: true });
});

module.exports = router;