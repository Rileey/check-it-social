import supertest from 'supertest';

import mongoose from 'mongoose';
import app from '../server';
const request = supertest(app);

 let db =
   'mongodb+srv://foodineTest:foodineTest@cluster0.0l9mo.mongodb.net/foodineTest';
describe('PRODUCTS test', () => {
  let mongo;
  beforeAll(async () => {
    const mongoURI = db;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it('should get the list of products', async () => {
    const response = await request.get('/dishes/list');
    expect(response.status).toBe(200);
  });

  it('should create a new dish', async () => {
    const foodIndex = Math.random() * 10;
    const dish = {
      name: `newDish ${foodIndex}`,
      image: 'imageeeeeeeee',
      category: 'best dishes',
      price: 500,
      countInStock: 500,
      description: 'testing...testing...testing...',
    };
    const result = await request.post('/dishes/list').send(dish);
    expect(result.status).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
