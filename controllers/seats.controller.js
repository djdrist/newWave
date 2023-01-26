const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
	try {
		res.json(await Seat.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const dep = await Seats.find({ id: req.params.id });
		if (!dep) res.status(404).json({ message: 'Not found' });
		else res.json(dep);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.add = async (req, res) => {
	const { day, seat, client, email } = req.body;
	try {
		const newSeat = new Seat({ id: Math.floor(Math.random() * 1000000), day, seat, client, email });
		await newSeat.save();
		const seats = await Seat.find();
		req.io.emit('seatsUpdated', seats);
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editById = async (req, res) => {
	const { day, seat, client, email } = req.body;
	try {
		const dep = await Seat.find({ id: req.params.id });
		if (dep) {
			await Seat.updateOne({ id: req.params.id }, { $set: { day, seat, client, email } });
			res.json({ message: 'OK' });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteById = async (req, res) => {
	try {
		const dep = await Seat.find({ id: req.params.id });
		if (dep) {
			await Seat.deleteOne({ id: req.params.id });
			res.json(dep);
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
