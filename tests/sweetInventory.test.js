import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
let sweetId;
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/sweetshop', {});
  // Create sweet to test purchase & restock
  const res = await request(app).post('/api/v1/addSweets').send({
    name: 'Inventory Mithai',
    category: 'Candy',
    price: 15,
    quantity: 20
  });
  sweetId = res.body.sweet._id;
});
afterAll(async () => {
  await mongoose.connection.close();
});
describe('Sweet API - Inventory Actions', () => {
  it('should purchase sweets and reduce quantity', async () => {
    const res = await request(app)
      .put(`/api/v1/purchaseSweet/${sweetId}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(15);
  });
  it('should return error if purchase quantity exceeds stock limit', async () => {
    const res = await request(app)
      .put(`/api/v1/purchaseSweet/${sweetId}`)
      .send({ quantity: 100 });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Not enough stock/i);
  });
  it('should restock sweets and increase quantity', async () => {
    const res = await request(app)
      .put(`/api/v1/restockSweet/${sweetId}`)
      .send({ quantity: 10 });
    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(25);
  });
});
