const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /concerts', () => {

  before(async () => {
    const testConOne = new Concert({
      _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe',
      genre: 'Rock',
      price: 25,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg',
      id: 1
    });
    await testConOne.save();

    const testConTwo = new Concert({
      _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Sven Kurden',
      genre: 'Pop',
      price: 35,
      day: 2,
      image: '/img/uploads/hdfh42sd213.jpg',
      id: 2
    });
    await testConTwo.save();

    const testConThree = new Concert({
      _id: '3d9f1140f10a81216cfd4489', performer: 'Adam Nowy',
      genre: 'Pop',
      price: 30,
      day: 1,
      image: '/img/uploads/hdfh42sd815.jpg',
      id: 3
    });
    await testConThree.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {

    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);

  });

  it('/:performer should return one performer by :performer ', async () => {
    const perf = 'John Doe'
    const res = await request(server).get(`/concerts/performer/${perf}`);
    const testPerf = await Concert.findOne({performer: `${perf}`});
    expect(testPerf.performer).to.be.equal(`${perf}`);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/:genre should return all concerts by :genre ', async () => {
    const genre = 'Pop';
    const res = await request(server).get(`/concerts/genre/${genre}`);
    const testGenre = await Concert.find({genre: `${genre}`});
    // expect(testGenre[0].genre).to.be.equal(`${genre}`);
    // expect(testGenre[1].genre).to.be.equal(`${genre}`);
    expect(testGenre).not.to.be.null;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
    expect(testGenre.length).to.be.equal(2);
  });

  it('/:day should return all concerts by :day ', async () => {
    const da = 1;
    const res = await request(server).get(`/concerts/genre/${da}`);
    const testDay = await Concert.find({day: `${da}`});
    expect(testDay).not.to.be.null;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
    expect(testDay.length).to.be.equal(2);
  });

  it(':price_min/:price_max should return all concerts by :price_min and :price_max ', async () => {
    const minPrice = 25;
    const maxPrice = 30;
    const res = await request(server).get(`/concerts/price/:${minPrice}/:${maxPrice}`);
    const testPrice = await Concert.find({ $and: [{ price: { $gte: minPrice} }, { price: {  $lte: maxPrice}}] });
    expect(testPrice).not.to.be.null;
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
    expect(testPrice.length).to.be.equal(2);
  });
});