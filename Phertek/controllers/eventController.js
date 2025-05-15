const fs = require('fs');
const path = require('path');
const events = require('../models/event');
const Rsvp = require('../models/rsvp');
const Event = require('../models/event');
const mongoose = require('mongoose');

exports.getAllEvents = (req, res) => {
    const searchQuery = req.query.search ? req.query.search.trim() : '';

    let query = {};
    if (searchQuery) {
        query = { title: { $regex: searchQuery, $options: 'i' } };
    }

    events.find(query)
        .then(filteredEvents => {
            const categories = [...new Set(filteredEvents.map(event => event.category))];
            res.render('events', { events: filteredEvents, categories, searchQuery });
        })
        .catch(error => {
            console.error("Error fetching events:", error);
            res.status(500).json({ message: "Internal Server Error" });
        });
};

exports.getEventDetails = async (req, res) => {
    try {
        const event = await events.findById(req.params.id).populate('host');
        if (!event) {
            return res.status(404).render('error', { errorCode: 404, errorMessage: 'Event Not Found' });
        }

        const yesCount = await Rsvp.countDocuments({ event: event._id, status: 'YES' });

        res.render('event', {
            event,
            yesCount,
            user: req.session.user
        });
    } catch (error) {
        console.error("Error fetching event details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getNewEventPage = (req, res) => {
    res.render('newEvent');
};

exports.createEvent = (req, res) => {
    const { category, title, startDate, endDate, details, location } = req.body;

    if (!startDate || !endDate) {
        console.error("Missing startDate or endDate");
        return res.status(400).json({ message: "Missing required fields" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : '/images/event.png';

    const newEvent = new events({
        category,
        title,
        host: req.session.user._id,
        startDate,
        endDate,
        details,
        location,
        image: imagePath
    });

    newEvent.save()
        .then(() => res.redirect('/events'))
        .catch(error => {
            console.error("Error creating event:", error);
            res.status(500).json({ message: "Internal Server Error" });
        });
};

exports.getEditEventPage = (req, res) => {
    events.findById(req.params.id)
        .then(event => {
            if (!event) return res.status(404).send('Event not found');

            if (!req.session.user || req.session.user._id !== event.host.toString()) {
                req.flash('error', 'You can only edit events you created.');
                return res.redirect(`/events/${event._id}`);
            }

            res.render('edit', { event });
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Server error');
        });
};

exports.updateEvent = (req, res) => {
    const eventId = req.params.id;

    events.findById(eventId)
        .then(event => {
            if (!event) return res.status(404).json({ message: 'Event not found' });

            if (!req.session.user || req.session.user._id !== event.host.toString()) {
                req.flash('error', 'You can only update events you created.');
                return res.redirect(`/events/${event._id}`);
            }

            if (req.file) {
                if (event.image && event.image !== '/images/event.png') {
                    const oldImagePath = path.join(__dirname, '../public/uploads', path.basename(event.image));
                    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
                }
                event.image = `/uploads/${req.file.filename}`;
            }

            Object.assign(event, req.body);
            return event.save();
        })
        .then(() => res.redirect('/events'))
        .catch(error => {
            console.error("Error updating event:", error);
            res.status(500).json({ message: "Internal Server Error" });
        });
};

exports.deleteEvent = (req, res) => {
    const eventId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ message: "Invalid Event ID" });
    }

    events.findById(eventId)
        .then(event => {
            if (!event) return res.status(404).json({ message: 'Event not found' });

            if (!req.session.user || req.session.user._id !== event.host.toString()) {
                req.flash('error', 'You can only delete events you created.');
                return res.redirect(`/events/${event._id}`);
            }

            if (event.image && event.image !== '/images/event.png') {
                const imagePath = path.join(__dirname, '../public/uploads', path.basename(event.image));
                if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            }

            return Rsvp.deleteMany({ event: eventId })
                .then(() => events.findByIdAndDelete(eventId));
        })
        .then(() => res.redirect('/events'))
        .catch(error => {
            console.error("Error deleting event:", error);
            res.status(500).json({ message: "Internal Server Error" });
        });
};

exports.rsvp = async (req, res, next) => {
    const eventId = req.params.id;
    const status = req.body.status;
  
    try {
      const event = await Event.findById(eventId).populate('host');
      if (!event) {
        return res.status(404).render('error', { error: 'Event not found' });
      }
  
      if (!req.session.user) {
        return res.redirect('/users/login');
      }
  
      if (event.host._id.toString() === req.session.user) {
        return res.status(401).render('error', { error: 'Cannot RSVP to your own event' });
      }
  
      await Rsvp.findOneAndUpdate(
        { event: eventId, user: req.session.user },
        { status },
        { upsert: true, new: true }
      );
  
      res.redirect(`/events/${eventId}`);
    } catch (err) {
      next(err);
    }
  };
  