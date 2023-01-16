const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
	res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
	res.json(db.seats.filter((e) => e.id === req.params.id));
});

router.route('/seats').post((req, res) => {
	const { day, seat, client, email } = req.body;
	const isSeatFree = db.seats.filter((r) => r.day == day && r.seat == seat).length === 0 ? true : false;
	console.log(db.seats);
	if (isSeatFree) {
		db.seats = [...db.seats, { id: uuidv4(), day, seat, client, email }];
		res.json({ message: 'OK' });
	} else {
		res.status(400).json({ message: 'The slot is already taken...' });
	}
});

router.route('/seats/:id').put((req, res) => {
	const { day, seat, client, email } = req.body;
	db.seats = db.seats.map((e) => (e.id === req.params.id ? { ...e, day, seat, client, email } : e));
	res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
	db.seats = db.seats.filter((e) => e.id !== req.params.id);
	res.json({ message: 'OK' });
});

module.exports = router;
