import { Request, Response } from 'express';
import Service from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const getService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const createService = async (req: Request, res: Response) => {
    try {
        const name = req.body;

        const service = new Service({ name });
        await service.save();

        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const service = await Service.findByIdAndUpdate(id, { name }, { new: true });

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndDelete(id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
