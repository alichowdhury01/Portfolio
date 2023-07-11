import e, { Request, Response } from 'express';
import BusSchedule, { IBusSchedule, IBusScheduleCounter, BusScheduleCounter } from '../models/bus/BusSchedule.model';

export class BusScheduleController {

    // Get all bus schedules
    public async getAllBusSchedules(req: Request, res: Response): Promise<void> {
        try {
            const busSchedules = await BusSchedule.find();
            res.status(200).json(busSchedules);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Get a specific bus schedule by ID
    public async getBusScheduleById(req: Request, res: Response): Promise<void> {
        const busScheduleId = req.params.id;
        try {
            const busSchedule = await BusSchedule.findById(busScheduleId);
            if (!busSchedule) {
                res.status(404).json({ error: 'Bus schedule not found' });
                return;
            }
            res.status(200).json(busSchedule);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Create a new bus schedule
    public async createBusSchedule(req: Request, res: Response): Promise<void> {
        try {
            const busScheduleData: IBusSchedule = req.body;

            // Get the next bus schedule ID from the counter collection
            const counter: IBusScheduleCounter = await BusScheduleCounter.findByIdAndUpdate(
                { _id: 'busScheduleId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );

            // Set the incremented ID to the bus schedule data
            busScheduleData._id = counter.seq;

            // Create the bus schedule document
            const createdBusSchedule: IBusSchedule = await BusSchedule.create(busScheduleData);

            res.status(201).json(createdBusSchedule);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Update an existing bus schedule
    public async updateBusSchedule(req: Request, res: Response): Promise<void> {
        const busScheduleId = req.params.id;
        const updatedBusScheduleData = req.body;
        try {
            const updatedBusSchedule = await BusSchedule.findByIdAndUpdate(
                busScheduleId,
                updatedBusScheduleData,
                { new: true }
            );
            if (!updatedBusSchedule) {
                res.status(404).json({ error: 'Bus schedule not found' });
                return;
            }
            res.status(200).json(updatedBusSchedule);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Delete an existing bus schedule
    public async deleteBusSchedule(req: Request, res: Response): Promise<void> {
        const busScheduleId = req.params.id;
        try {
            const deletedBusSchedule = await BusSchedule.findByIdAndDelete(busScheduleId);
            if (!deletedBusSchedule) {
                res.status(404).json({ error: 'Bus schedule not found' });
                return;
            }
            res.status(200).json(deletedBusSchedule);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const busScheduleController = new BusScheduleController();