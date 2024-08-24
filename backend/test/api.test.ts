import request from 'supertest';

import app from '../src/app';

describe('GET /api/v1/health', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/health')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /api/v1/grid', () => {
  it('responds with a json message', (done) => {
    request(app)
      .post('/api/v1/grid')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should accept body with field named character with one letter', (done) => {
    request(app)
      .post('/api/v1/grid')
      .set('Accept', 'application/json')
      .send({ character: 'a' })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should not accept body with other field names', (done) => {
    request(app)
      .post('/api/v1/grid')
      .set('Accept', 'application/json')
      .send({ other: 'a' })
      .expect('Content-Type', /json/)
      .expect(400, { status: 'error',
        message: 'Validation error occurred.',
        errorCode: 'VALIDATION_ERROR',
        errors: 'is not allowed' }, done);
  });

  it('should not accept more than 1 character', (done) => {
    request(app)
      .post('/api/v1/grid')
      .set('Accept', 'application/json')
      .send({ character: 'dd' })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('should not accept none a-z character', (done) => {
    request(app)
      .post('/api/v1/grid')
      .set('Accept', 'application/json')
      .send({ character: '1' })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
 
  it('should not accept empty character', (done) => {
    request(app)
      .post('/api/v1/grid')
      .set('Accept', 'application/json')
      .send({ character: '' })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });
});
