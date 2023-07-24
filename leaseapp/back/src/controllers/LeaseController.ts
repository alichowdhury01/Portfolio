import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import  LeaseModel, { ILease } from '../models/LeaseModel';

export class LeaseController {

    // Create a new lease
    public async createLease(req: Request, res: Response) {
        try {
            const newLease = new LeaseModel(req.body);
            const result = await newLease.save();
            res.status(StatusCodes.CREATED).json(result);
            console.log(result);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    // Get all leases
    public async getAllLeases(req: Request, res: Response) {
        try {
            const result = await LeaseModel.find();
            res.status(StatusCodes.OK).json(result);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    // Get a single lease
    public async getLeaseById(req: Request, res: Response): Promise<void> {
        const leaseId = req.params.id;
        try {
            const result = await LeaseModel.findById(leaseId);
            if (!result) {
                res.status(StatusCodes.NOT_FOUND).json({ message: 'Lease not found' });
                return;
            }
            res.status(StatusCodes.OK).json(result);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    public async updateLease(req: Request, res: Response): Promise<void> {
        const leaseId = req.params.id;
        const updatedLeaseData = req.body;
        try {
            const updatedLease = await LeaseModel.findByIdAndUpdate(leaseId, updatedLeaseData, {
                new: true,
                runValidators: true,
            });
            if (!updatedLease) {
                res.status(StatusCodes.NOT_FOUND).json({ message: 'Lease not found' });
                return;
            }
            res.status(StatusCodes.OK).json(updatedLease);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    // Delete a lease
    public async deleteLease(req: Request, res: Response): Promise<void> {
        const leaseId = req.params.id;
        try {
            const deletedLease = await LeaseModel.findByIdAndDelete(leaseId);
            if (!deletedLease) {
                res.status(StatusCodes.NOT_FOUND).json({ message: 'Lease not found' });
                return;
            }
            res.status(StatusCodes.OK).json(deletedLease);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}

export const leaseController = new LeaseController();
