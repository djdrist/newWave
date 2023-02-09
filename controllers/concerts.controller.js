const Concert = require('../models/concert.model');
const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
	let response = [];
	try {
		const concerts = await Concert.find();
		for await (const concert of concerts) {
			const seats = await Seat.find({ day: concert.day });
			let concertWithTickets = { ...concert._doc };
			concertWithTickets.tickets = 50 - seats.length;
			response.push(concertWithTickets);
		}
		res.json(response);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const dep = await Concert.find({ id: req.params.id });
		if (!dep) res.status(404).json({ message: 'Not found' });
		else res.json(dep);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.add = async (req, res) => {
	const { performer, genre, price, date, image } = req.body;
	try {
		const newConcert = new Concert({ id: Math.floor(Math.random() * 1000000), performer, genre, price, day, image });
		await newConcert.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editById = async (req, res) => {
	const { performer, genre, price, date, image } = req.body;
	try {
		const dep = await Concert.find({ id: req.params.id });
		if (dep) {
			await Concert.updateOne({ id: req.params.id }, { $set: { performer, genre, price, date, image } });
			const updatedDep = await Concert.findById(req.params.id);
			res.json(updatedDep);
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteById = async (req, res) => {
	try {
		const dep = await Concert.find({ id: req.params.id });
		if (dep) {
			await Concert.deleteOne({ id: req.params.id });
			res.json(dep);
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByPerformer = async (req, res) => {
	try {
		const dep = await Concert.find({ performer: req.params.performer });
		if (!dep) res.status(404).json({ message: 'Not found' });
		else res.json(dep);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByGenre = async (req, res) => {
	try {
		const dep = await Concert.find({ genre: req.params.genre });
		if (!dep) res.status(404).json({ message: 'Not found' });
		else res.json(dep);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByPrice = async (req, res) => {
	try {
		const dep = await Concert.find({ price: { $gt: req.params.price_min, $lt: req.params.price_max } });
		if (!dep) res.status(404).json({ message: 'Not found' });
		else res.json(dep);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getByDay = async (req, res) => {
	try {
		const dep = await Concert.find({ day: req.params.day });
		if (!dep) res.status(404).json({ message: 'Not found' });
		else res.json(dep);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
