import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import routes from './routes';
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.DB_NAME || '';

mongoose
  .connect(`${MONGODB_URI}/${DB_NAME}`)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

app.use(cors());

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
