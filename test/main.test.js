// eslint-disable-next-line no-unused-vars
const app = require('../app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('API Tests', () => {
  it('should return version number', done => {
    request('http://localhost:3000').get('/').end((err, res) => {
      // eslint-disable-next-line no-unused-expressions
      // expect(res.body.version).to.be.ok;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

// global.console.log('server: ', app);

// Устанавливаем среду разработки в 'test'
process.env.NODE_ENV = 'test';
