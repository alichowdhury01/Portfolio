import { Request, Response } from 'express';
import BusStop,{ BusStopCounter, IBusStop, IBusStopCounter } from '../models/bus/BusStop.model';

export class BusStopController {

    // Get all bus stops
    public async getAllBusStops(req: Request, res: Response): Promise<void> {
        try {
            const busStops = await BusStop.find();
            res.status(200).json(busStops);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Get a specific bus stop by ID
    public async getBusStopById(req: Request, res: Response): Promise<void> {
        const busStopId = req.params.id;
        try {
            const busStop = await BusStop.findById(busStopId);
            if (!busStop) {
                res.status(404).json({ error: 'Bus stop not found' });
                return;
            }
            res.status(200).json(busStop);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Create a new bus stop
    public async createBusStop(req: Request, res: Response): Promise<void> {
        try {
            const busStopData: IBusStop = req.body;

            // Get the next bus stop ID from the counter collection
            const counter: IBusStopCounter = await BusStopCounter.findByIdAndUpdate(
                { _id: 'busStopId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );

            // Set the incremented ID to the busStopData
            busStopData._id = counter.seq;

            // Create the bus stop document
            const createdBusStop: IBusStop = await BusStop.create(busStopData);

            res.status(201).json(createdBusStop);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Update an existing bus stop
    public async updateBusStop(req: Request, res: Response): Promise<void> {
        const busStopId = req.params.id;
        const updatedBusStopData = req.body;
        try {
            const updatedBusStop = await BusStop.findByIdAndUpdate(
                busStopId,
                updatedBusStopData,
                { new: true }
            );
            if (!updatedBusStop) {
                res.status(404).json({ error: 'Bus stop not found' });
                return;
            }
            res.status(200).json(updatedBusStop);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Delete an existing bus stop
    public async deleteBusStop(req: Request, res: Response): Promise<void> {
        const busStopId = req.params.id;
        try {
            const deletedBusStop = await BusStop.findByIdAndDelete(busStopId);
            if (!deletedBusStop) {
                res.status(404).json({ error: 'Bus stop not found' });
                return;
            }
            res.status(200).json(deletedBusStop);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const busStopController = new BusStopController();