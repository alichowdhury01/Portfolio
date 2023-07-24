import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';
import cors from 'cors';


dotenv.config();

class Server {
  private server: Application;

  constructor() {
    this.server = express();
    this.config();
    this.connectToDatabase();
    this.initalizeRoutes();
    this.handleErrors();
  }

  private config(): void {
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());

  }

  private connectToDatabase(): void {
    const { MONGODB_URI, DB_NAME } = process.env;
    mongoose
      .connect(`${MONGODB_URI}/${DB_NAME}`)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
      });
  }

  private initalizeRoutes(): void {
    this.server.use(routes);
  }

  private handleErrors(): void {
    this.server.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
  }

  public start(port: number): void {
    this.server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

const server = new Server();
server.start(3000);


