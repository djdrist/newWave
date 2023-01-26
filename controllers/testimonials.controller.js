const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
	try {
		res.json(await Testimonial.find());
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getRandom = async (req, res) => {
	try {
		const count = await Testimonial.countDocuments();
		const rand = Math.floor(Math.random() * count);
		const dep = await Testimonial.findOne().skip(rand);
		if (!dep) res.status(404).json({ message: 'Not found' });
		else res.json(dep);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.getById = async (req, res) => {
	try {
		const dep = await Testimonial.find({ id: req.params.id });
		if (!dep) res.status(404).json({ message: 'Not found' });
		else res.json(dep);
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.add = async (req, res) => {
	const { author, text } = req.body;
	try {
		const newTestimonial = new Testimonial({ id: Math.floor(Math.random() * 1000000), author, text });
		await newTestimonial.save();
		res.json({ message: 'OK' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.editById = async (req, res) => {
	const { author, text } = req.body;
	try {
		const dep = await Testimonial.find({ id: req.params.id });
		if (dep) {
			await Testimonial.updateOne({ id: req.params.id }, { $set: { author, text } });
			res.json({ message: 'OK' });
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};

exports.deleteById = async (req, res) => {
	try {
		const dep = await Testimonial.find({ id: req.params.id });
		if (dep) {
			await Testimonial.deleteOne({ id: req.params.id });
			res.json(dep);
		} else res.status(404).json({ message: 'Not found...' });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
