const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
	it('/performer/:performer should return concerts by performer', async () => {
		const res = await request(server).get('/api/concerts/performer/John Doe');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(1);
	});

	it('/genre/:genre should return concerts from genre', async () => {
		const res = await request(server).get('/api/concerts/genre/Pop');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(1);
	});

	it('/price/:price_min/:price_max should return concerts with tickets within price range', async () => {
		const res = await request(server).get('/api/concerts/price/10/20');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(0);
	});

	it('/day/:day should return concerts on a given day', async () => {
		const res = await request(server).get('/api/concerts/day/1');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		expect(res.body.length).to.be.equal(3);
	});

	it('/concerts should return concerts with sold tickets information', async () => {
		const res = await request(server).get('/api/concerts');
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('array');
		res.body.forEach((element) => {
			expect(element).to.have.property('tickets');
		});
	});
});
