import { Request, Response } from 'express';
import Bus,{ BusCounter, IBus, IBusCounter } from '../models/bus/Bus.model';
import mongoose from 'mongoose';

export class BusController {
  
    // Get all buses   
    public async getAllBuses(req: Request, res: Response): Promise<void> {
      try {
        const buses = await Bus.find();
        res.status(200).json(buses);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    // Get a specific bus by ID
    public async getBusById(req: Request, res: Response): Promise<void> {
      const busId = req.params.id;
      try {
        const bus = await Bus.findById(busId);
        if (!bus) {
          res.status(404).json({ error: 'Bus not found' });
          return;
        }
        res.status(200).json(bus);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    // Create a new bus
 
  public async createBus(req: Request, res: Response): Promise<void> {
    try {
      const busData: IBus = req.body;

      // Get the next bus ID from the counter collection
      const counter: IBusCounter = await BusCounter.findByIdAndUpdate(
        { _id: 'busId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
  
      // Set the incremented ID to the busData
      busData._id = counter.seq;
  
      // Create the bus document
      const createdBus: IBus = await Bus.create(busData);
  
      res.status(201).json(createdBus);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
    // Update an existing bus
    public async updateBus(req: Request, res: Response): Promise<void> {
      const busId = req.params.id;
      const updatedBusData = req.body;
      try {
        const updatedBus = await Bus.findByIdAndUpdate(busId, updatedBusData, { new: true });
        if (!updatedBus) {
          res.status(404).json({ error: 'Bus not found' });
          return;
        }
        res.status(200).json(updatedBus);
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }

    // Patch busRoute to bus
    public async patchBus(req: Request, res: Response): Promise<void> {
      try {
        const Bus = mongoose.model('Bus');
        const BusRoute = mongoose.model('BusRoute');
        const busId = req.params.id;
        const busRouteId = req.body.busRouteId;

        // Check if bus exists
        const bus = await Bus.findById(busId);
        if (!bus) {
          res.status(404).json({ error: 'Bus not found' });
          return;
        }

        // Check if busRoute exists
        const busRoute = await BusRoute.findById(busRouteId);
        if (!busRoute) {
          res.status(404).json({ error: 'BusRoute not found' });
          return;
        }

        bus.busRoute.push(busRoute);

        const updatedBus = await bus.save();

        res.status(200).json(updatedBus);
      } catch (error: any) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
    
    // Delete a bus
    public async deleteBus(req: Request, res: Response): Promise<void> {
      const busId = req.params.id;
      try {
        const deletedBus = await Bus.findByIdAndRemove(busId);
        if (!deletedBus) {
          res.status(404).json({ error: 'Bus not found' });
          return;
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  
export const busController = new BusController();
