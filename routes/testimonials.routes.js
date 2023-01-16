const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
	res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
	const index = Math.floor(Math.random() * db.testimonials.length);
	res.json(db.testimonials[index]);
});

router.route('/testimonials/:id').get((req, res) => {
	res.json(db.testimonials.filter((e) => e.id === req.params.id));
});

router.route('/testimonials').post((req, res) => {
	const { author, text } = req.body;
	db.testimonials = [...db.testimonials, { id: uuidv4(), author, text }];
	res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
	const { author, text } = req.body;
	db.testimonials = db.testimonials.map((e) => (e.id === req.params.id ? { ...e, author, text } : e));
	res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
	db.testimonials = db.testimonials.filter((e) => e.id !== req.params.id);
	res.json({ message: 'OK' });
});

module.exports = router;
