const express = require('express');
const eventController = require('../controllers/eventController');
const upload = require('../middleware/fileUpload');
const { isLoggedIn } = require('../controllers/userController');
const { validateEvent } = require('../middleware/validator');
const router = express.Router();

router.get('/', eventController.getAllEvents);
router.get('/new', isLoggedIn, eventController.getNewEventPage);
router.post('/', isLoggedIn, upload.single('image'), validateEvent, eventController.createEvent);
router.get('/:id', eventController.getEventDetails);
router.get('/:id/edit', isLoggedIn, eventController.getEditEventPage);
router.put('/:id', isLoggedIn, upload.single('image'), eventController.updateEvent);
router.delete('/:id', isLoggedIn, eventController.deleteEvent);
router.post('/:id/rsvp', isLoggedIn, eventController.rsvp);

module.exports = router;
