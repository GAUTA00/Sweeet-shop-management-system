jest.setTimeout(20000);
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://gautamprajapati31012004:BSPq2gHNEBEzaaBg@cluster0.d6y0tta.mongodb.net/sweetshop', {});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Sweet API - Add Sweet api', () => {
    it('should create a new sweet and return it with status 201', async () => {
        const newSweet = {
            name: 'Rasgulla',
            category: 'Milk-Based',
            price: 20,
            quantity: 50,
        };

        const response = await request(app)
            .post('/api/v1/addSweets')
            .send(newSweet);
        expect(response.statusCode).toBe(201);
        expect(response.body.sweet).toHaveProperty('name', newSweet.name);
        expect(response.body.sweet).toHaveProperty('category', newSweet.category);
        expect(response.body.sweet).toHaveProperty('price', newSweet.price);
        expect(response.body.sweet).toHaveProperty('quantity', newSweet.quantity);
        expect(response.body.sweet).toHaveProperty('sweetId');
    }, 10000);

    it('should return error message for missing fields', async () => {
        const incompleteSweet = {
            name: 'Gulab Jamun',
            category: 'Milk-Based',
            price: 15,
        };

        const response = await request(app)
            .post('/api/v1/addSweets')
            .send(incompleteSweet);
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Error while adding sweet to the shop');
    }, 10000);

});

