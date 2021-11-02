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
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('/ should return all concerts', async () => {

    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);

  });

  it('/:id should return one performer by :performer ', async () => {
    const res = await request(server).get('/concerts/performer/John Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('/:id should return genre by :genre ', async () => {
    const res = await request(server).get('/concerts/genre/Po7');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });
});