const express = require('express');
const router = express.Router();
const sendEmailController = require('../controllers/EmailController');

// Define route to handle sending email
router.post('/send-email', async (req, res) => {
    const { studentEmail, courseName } = req.body;
    try {
        const result = await sendEmailController.sendEnrollmentEmail(studentEmail, courseName);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

module.exports = router;
