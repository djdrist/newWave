const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');

const app = express();

const server = app.listen(process.env.PORT || 8000, () => {
	console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
	console.log('New socket!');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000', //origin sets domains that we approve
		methods: 'GET,POST,PUT,DELETE', //we allow only GET and POST methods
	})
);

app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', testimonialsRoutes);
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
