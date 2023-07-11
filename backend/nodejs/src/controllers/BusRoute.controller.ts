import {Request, Response} from 'express';
import BusRoute, { IBusRoute, IBusRouteCounter, BusRouteCounter } from '../models/bus/BusRoute.model';

import mongoose from 'mongoose';


export class BusRouteController{


    // Get all bus routes
    public async getAllBusRoutes(req: Request, res: Response): Promise<void>{
        try{
            const busRoutes = await BusRoute.find();
            res.status(200).json(busRoutes);
        }catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    }

    // Get a specific bus route by ID
    public async getBusRouteById(req: Request, res: Response): Promise<void>{
        const busRouteId = req.params.id;
        try{
            const busRoute = await BusRoute.findById(busRouteId);
            if(!busRoute){
                res.status(404).json({error: 'Bus route not found'});
                return;
            }
            res.status(200).json(busRoute);
        }catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    }

    // Create a new bus route
    public async createBusRoute(req: Request, res: Response): Promise<void>{
        try{
            const busRouteData: IBusRoute = req.body;

            // Get the next bus route ID from the counter collection
            const counter: IBusRouteCounter = await BusRouteCounter.findByIdAndUpdate(
                {_id: 'busRouteId'},
                {$inc: {seq: 1}},
                {new: true, upsert: true}
            );

            // Set the incremented ID to the busRouteData
            busRouteData._id = counter.seq;

            // Create the bus route document
            const createdBusRoute: IBusRoute = await BusRoute.create(busRouteData);

            res.status(201).json(createdBusRoute);
        }catch(error){
            res.status(500).json({error: 'Internal Server Error'});
        }
    }

    // Update an existing bus route
    public async updateBusRoute(req: Request, res: Response): Promise<void>{
        const busRouteId = req.params.id;
        const updatedBusRouteData = req.body;
        try{
            const updatedBusRoute = await BusRoute.findByIdAndUpdate(
                busRouteId,
                updatedBusRouteData,
                {new: true}
            );
            if(!updatedBusRoute){
                res.status(404).json({error: 'Bus route not found'});
                return;
            }
            res.status(200).json(updatedBusRoute);
        }catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    }

    // Patch an existing bus route


    
    public async patchBusRoute(req: Request, res: Response): Promise<void> {
        try {
            const BusRoute = mongoose.model('BusRoute'); // Retrieve the model BusRoute
            const BusSchedule = mongoose.model('BusSchedule'); // Retrieve the model BusSchedule
            const busRouteId = req.params.id; // ID of the document from Collection BusRoute
            const busScheduleId = req.body.id; // ID of the document from Collection BusSchedule

            // Retrieve the document from Collection BusRoute
            const busRoute: any = await BusRoute.findById(busRouteId);

            // Retrieve the document from Collection BusSchedule
            const busSchedule: any = await BusSchedule.findById(busScheduleId);

        // Push the document from Collection BusSchedule to the field routeSchedule of the document from Collection BusRoute
            busRoute.routeSchedule.push(busSchedule);

            // Save the updated document from Collection BusRoute
            const updatedBusRoute: any = await busRoute.save();

            res.status(200).json(updatedBusRoute);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    


    // Delete an existing bus route
    public async deleteBusRoute(req: Request, res: Response): Promise<void>{
        const busRouteId = req.params.id;
        try{
            const deletedBusRoute = await BusRoute.findByIdAndDelete(busRouteId);
            if(!deletedBusRoute){
                res.status(404).json({error: 'Bus route not found'});
                return;
            }
            res.status(200).json(deletedBusRoute);
        }catch(error){
            res.status(500).json({error: 'Internal server error'});
        }
    }

}

export const busRouteController = new BusRouteController();
