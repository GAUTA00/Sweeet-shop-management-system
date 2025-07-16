import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/sweetshop', {});

  // Seed sweets
  await request(app).post('/api/v1/addSweets').send({
    name: 'Rasmalai',
    category: 'Milk-Based',
    price: 20,
    quantity: 50
  });

  await request(app).post('/api/v1/addSweets').send({
    name: 'Gulab Jamun',
    category: 'Sugary-Based',
    price: 50,
    quantity: 100
  });

  await request(app).post('/api/v1/addSweets').send({
    name: 'Barfi',
    category: 'Milk-Based',
    price: 30,
    quantity: 70
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Sweet API - Search and Sort', () => {

  it('should return sweets filtered by category', async () => {
    const res = await request(app).get('/api/v1/searchSweets?category=Milk-Based');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.sweets)).toBe(true);
    res.body.sweets.forEach(sweet => {
      expect(sweet.category).toBe('Milk-Based');
    });
  });

  it('should return sweets filtered by name', async () => {
    const res = await request(app).get('/api/v1/searchSweets?name=Rasmalai');

    expect(res.statusCode).toBe(200);
    expect(res.body.sweets.length).toBeGreaterThanOrEqual(1);
    expect(res.body.sweets[0].name).toBe('Rasmalai');
  });

  it('should return sweets sorted by price ascending', async () => {
    const res = await request(app).get('/api/v1/searchSweets?sortBy=price&order=asc');
    const prices = res.body.sweets.map(s => s.price);
    const sorted = [...prices].sort((a, b) => a - b);
    expect(res.statusCode).toBe(200);
    expect(prices).toEqual(sorted);
  });

  it('should return sweets sorted by quantity descending', async () => {
    const res = await request(app).get('/api/v1/searchSweets?sortBy=quantity&order=desc');

    expect(res.statusCode).toBe(200);
    const qty = res.body.sweets.map(s => s.quantity);
    const sorted = [...qty].sort((a, b) => b - a);
    expect(qty).toEqual(sorted);
  });
});
