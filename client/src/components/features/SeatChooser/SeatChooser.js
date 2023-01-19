import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import io from 'socket.io-client';
import { getSeats, loadSeatsRequest, loadSeats, getRequests } from '../../../redux/seatsRedux';
import { SOCKET_URL } from '../../../config';
import './SeatChooser.scss';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
	const dispatch = useDispatch();
	const seats = useSelector(getSeats);
	const seatsTotal = 50;
	const requests = useSelector(getRequests);
	const [socket, setSocket] = useState();

	useEffect(() => {
		const socket = io(SOCKET_URL);
		setSocket(socket);
		socket.on('seatsUpdated', (seats) => {
			dispatch(loadSeats(seats));
		});
		dispatch(loadSeatsRequest());
	}, [dispatch]);

	const isTaken = (seatId) => {
		return seats.some((item) => item.seat === seatId && item.day === chosenDay);
	};

	const seatsTaken = seats.filter((item) => item.day === chosenDay).length;

	const prepareSeat = (seatId) => {
		if (seatId === chosenSeat)
			return (
				<Button
					key={seatId}
					className='seats__seat'
					color='primary'>
					{seatId}
				</Button>
			);
		else if (isTaken(seatId))
			return (
				<Button
					key={seatId}
					className='seats__seat'
					disabled
					color='secondary'>
					{seatId}
				</Button>
			);
		else
			return (
				<Button
					key={seatId}
					color='primary'
					className='seats__seat'
					outline
					onClick={(e) => updateSeat(e, seatId)}>
					{seatId}
				</Button>
			);
	};

	return (
		<div>
			<h3>Pick a seat</h3>
			<small
				id='pickHelp'
				className='form-text text-muted ml-2'>
				<Button color='secondary' /> – seat is already taken
			</small>
			<small
				id='pickHelpTwo'
				className='form-text text-muted ml-2 mb-4'>
				<Button
					outline
					color='primary'
				/>{' '}
				– it's empty
			</small>
			{requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success && (
				<div className='seats'>
					{[...Array(seatsTotal)].map((x, i) => prepareSeat(i + 1))}
					<p>
						Free seats: {seatsTotal - seatsTaken}/{seatsTotal}
					</p>
				</div>
			)}
			{requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending && (
				<Progress
					animated
					color='primary'
					value={50}
				/>
			)}
			{requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error && <Alert color='warning'>Couldn't load seats...</Alert>}
		</div>
	);
};

export default SeatChooser;
