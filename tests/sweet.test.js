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

describe('Sweet API - Update Sweet', () => {
    let sweetId;
    beforeAll(async () => {
        // First,we'll create a sweet to update
        const sweet = await request(app)
            .post('/api/v1/addSweets')
            .send({
                name: 'Gulab Jamun',
                category: 'Milk-Based',
                price: 30,
                quantity: 40
            });
        // console.log("Created sweet response:", sweet.body);
        sweetId = sweet.body.sweet?._id || sweet.body._id || 'undefined';
    });

    it('should update the sweet and return status 200', async () => {
        const response = await request(app)
            .put(`/api/v1/updateSweet/${sweetId}`)
            .send({
                name: 'Updated Gulab Jamun',
                category: 'Milk-Based',
                price: 35,
                quantity: 45
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.sweet).toHaveProperty('name', 'Updated Gulab Jamun');
        expect(response.body.sweet).toHaveProperty('price', 35);
        expect(response.body.sweet).toHaveProperty('quantity', 45);
    });

    it('should return 404 if sweet to update does not exist', async () => {
        const fakeId = '64e129ac7b12345678901234';
        const response = await request(app)
            .put(`/api/v1/updateSweet/${fakeId}`)
            .send({
                name: 'Non-existent Sweet',
                category: 'Candy',
                price: 99,
                quantity: 10
            });
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Sweet not found');
    });
});

describe('Sweet API - Delete Sweet', () => {
    let sweetId;
    beforeAll(async () => {
        // Create a sweet to delete
        const sweet = await request(app)
            .post('/api/v1/addSweets')
            .send({
                name: 'Delete Me',
                category: 'Candy',
                price: 15,
                quantity: 10
            });
        sweetId = sweet.body.sweet._id;
    });

    it('should delete the sweet and return status 200', async () => {
        const response = await request(app)
            .delete(`/api/v1/deleteSweet/${sweetId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Sweet deleted successfully');
    });

    it('should return 404 if sweet is already deleted or not found', async () => {
        const response = await request(app)
            .delete(`/api/v1/deleteSweet/${sweetId}`);
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Sweet not found');
    });
});