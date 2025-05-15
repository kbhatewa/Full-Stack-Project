const User = require('../models/userModel');
const Event = require('../models/event');
const Rsvp = require('../models/rsvp');
const bcrypt = require('bcrypt');

exports.showLogin = (req, res) => {
    res.render('user/login');
};

exports.showRegister = (req, res) => {
    res.render('user/new');
};

exports.register = async (req, res) => {
    try {
        await User.create(req.body);
        req.flash('success', 'Registration successful! You can now log in.');
        res.redirect('/user/login');
    } catch (err) {
        req.flash('error', 'Registration failed. Please check your input or try again.');
        res.redirect('/user/new');
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            req.flash('error', 'Email not found. Please sign up first.');
            return res.redirect('/user/login');
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            req.flash('error', 'Incorrect password. Please try again.');
            return res.redirect('/user/login');
        }

        req.session.user = { _id: user._id, name: user.firstName };
        req.flash('success', `Welcome back, ${user.firstName}!`);
        res.redirect('/user/profile');

    } catch (err) {
        console.error(err);
        req.flash('error', 'An unexpected error occurred. Please try again.');
        res.redirect('/user/login');
    }
};

exports.profile = async (req, res) => {
    try {
        const events = await Event.find({ host: req.session.user._id });
        const rsvps = await Rsvp.find({ user: req.session.user._id }).populate('event');

        res.render('user/profile', {
            user: req.session.user,
            events,
            rsvps
        });
    } catch (err) {
        console.error("Error loading profile:", err);
        req.flash('error', 'Failed to load profile.');
        res.redirect('/');
    }
};

exports.logout = (req, res) => {
    req.flash('success', 'You have been logged out.');
    req.session.save(() => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
};

exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to access that page.');
        return res.redirect('/user/login');
    }
    next();
};
