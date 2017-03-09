const request = require('supertest');

const app = require('../app').default;

describe('Main page', () => {
  it('Title: Welcome', done => {
    request(app).get('/').expect(200).expect(/Welcome/, done);
  });
});

// Устанавливаем среду разработки в 'test'
process.env.NODE_ENV = 'test';
