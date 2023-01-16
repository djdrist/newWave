const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
	res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
	res.json(db.concerts.filter((e) => e.id === req.params.id));
});

router.route('/concerts').post((req, res) => {
	const { performer, genre, price, date, image } = req.body;
	db.concerts = [...db.concerts, { id: uuidv4(), performer, genre, price, date, image }];
	res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
	const { performer, genre, price, date, image } = req.body;
	db.concerts = db.concerts.map((e) => (e.id === req.params.id ? { ...e, performer, genre, price, date, image } : e));
	res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
	db.concerts = db.concerts.filter((e) => e.id !== req.params.id);
	res.json({ message: 'OK' });
});

module.exports = router;
