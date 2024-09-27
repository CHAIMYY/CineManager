const request = require('supertest');
const app = require('../app.js'); 

describe('POST /api/salle/createSalle', () => {
  it('should create a new salle', async () => {
    const response = await request(app)
      .post('/api/salle/createSalle')
      .send({
        name: 'Main Hall',
        capacity: 100,
        location: 'Downtown',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Main Hall');
  });
});
