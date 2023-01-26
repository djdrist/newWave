const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
	try {
		res.json(await Concert.find());
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
