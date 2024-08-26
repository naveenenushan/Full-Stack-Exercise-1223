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
      .expect(
        400,
        {
          status: 'error',
          message: 'Validation error occurred.',
          errorCode: 'VALIDATION_ERROR',
          errors: 'is not allowed',
        },
        done,
      );
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
describe('POST /api/v1/payments/create', () => {
  it('should accept body with the data', (done) => {
    request(app)
      .post('/api/v1/payments/create')
      .set('Accept', 'application/json')
      .send({
        amount: '222',
        name: 'test',
        code: '22',
        grid: [
          ['p', 'w', 'w', 'w', 'b', 'w', 'g', 'o', 's', 'x'],
          ['r', 's', 'b', 'z', 'h', 'a', 't', 'z', 'w', 'q'],
          ['y', 'x', 'n', 'g', 'm', 'x', 'q', 'b', 'w', 'w'],
          ['a', 'o', 'b', 'd', 'w', 'r', 'p', 's', 'r', 'h'],
          ['i', 'w', 'b', 'w', 'h', 'e', 'w', 'c', 'i', 'z'],
          ['k', 'w', 'z', 'w', 'g', 'w', 'p', 'e', 'w', 'g'],
          ['w', 'd', 'w', 'v', 'o', 'w', 'w', 'z', 'h', 'g'],
          ['y', 'p', 't', 'm', 'p', 'u', 'l', 'w', 't', 's'],
          ['n', 't', 'v', 'a', 'r', 's', 'j', 'm', 'w', 'c'],
          ['h', 'w', 'u', 'n', 'g', 'j', 'w', 'w', 'c', 't'],
        ],
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
  it('should not accept body with the wrong grid data', (done) => {
    request(app)
      .post('/api/v1/payments/create')
      .set('Accept', 'application/json')
      .send({
        amount: '222',
        name: 'test',
        code: '22',
        grid: [
          ['p', 'w', 'w', 'w', 'b', 'w', 'g', 'o', 's', 'x'],
          ['r', 's', 'b', 'z', 'h', 'a', 't', 'z', 'w', 'q'],
          ['y', 'x', 'n', 'g', 'm', 'x', 'q', 'b', 'w', 'w'],
          ['a', 'o', 'b', 'd', 'w', 'r', 'p', 's', 'r', 'h'],
          ['i', 'w', 'b', 'w', 'h', 'e', 'w', 'c', 'i', 'z'],
          ['k', 'w', 'z', 'w', 'g', 'w', 'p', 'e', 'w', 'g'],
          ['w', 'd', 'w', 'v', 'o', 'w', 'w', 'z', 'h', 'g'],
          ['y', 'p', 't', 'm', 'p', 'u', 'l', 'w', 't', 's'],
          ['n', 't', 'v', 'a', 'r', 's', 'j', 'm', 'w', 'c'],
          ['h', 'w', 'u', 'n', 'g', 'j', 'w', 'w', 'c'],
        ],
      })
      .expect('Content-Type', /json/)
      .expect(
        400,
        {
          status: 'error',
          message: 'Grid data is not valid',
          errorCode: 'GRID_DATA_INVALID',
          errors: '',
        },
        done,
      );
  });
});
describe('GET /api/v1/payments', () => {
  it('should get body with the data', (done) => {
    request(app)
      .get('/api/v1/payments')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});