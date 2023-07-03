import { Request, Response } from 'express';
import Tenant, { ITenant } from '../models/Tenant';

export const createTenant = async (req: Request, res: Response) => {
  try {
    //example json
    // {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "address": "123 Main St",
    //     "city": "New York",
    //     "state": "NY",
    //     "postalCode": "12345",
    //     "phone": "123-456-7890",
    //     "email": "john.doe@example.com",
    //     "apartmentNumber": "A1",
    //     "emergencyContactName": "Jane Smith",
    //     "emergencyContactPhone": "987-654-3210",
    //     "services": [
    //       {
    //         "name": "Cleaning",
    //         "description": "Regular cleaning service",
    //         "startHour": "9:00 AM",
    //         "endHour": "12:00 PM",
    //         "day": "Monday",
    //         "pab": {
    //           "number": "123",
    //           "phone": "555-123-4567"
    //         }
    //       }
    //     ]
    //   }
      
      
      

    const {
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      phone,
      email,
      apartmentNumber,
      emergencyContactName,
      emergencyContactPhone,
      services,
    } = req.body;

    const tenant: ITenant = new Tenant({
      firstName,
      lastName,
      address,
      city,
      state,
      postalCode,
      phone,
      email,
      apartmentNumber,
      emergencyContactName,
      emergencyContactPhone,
      services,
    });

    await tenant.save();

    res.status(201).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getTenants = async (req: Request, res: Response) => {
    try {
        const tenants = await Tenant.find();
        res.json(tenants);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
    }

export const getTenant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tenant = await Tenant.findById(id);

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        res.json(tenant);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateTenant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            address,
            city,
            state,
            postalCode,
            phone,
            email,
            apartmentNumber,
            emergencyContactName,
            emergencyContactPhone,
            services,
        } = req.body;

        const tenant = await Tenant.findByIdAndUpdate(id, {
            firstName,
            lastName,
            address,
            city,
            state,
            postalCode,
            phone,
            email,
            apartmentNumber,
            emergencyContactName,
            emergencyContactPhone,
            services,
        }, { new: true });

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        res.json(tenant);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteTenant = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tenant = await Tenant.findByIdAndDelete(id);

        if (!tenant) {
            return res.status(404).json({ message: 'Tenant not found' });
        }

        res.json({ message: 'Tenant deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}