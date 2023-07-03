import {Request, Response} from 'express';
import Employee from '../models/Employee';

export const getEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
};

export const getEmployee = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({message: 'Employee not found'});
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, salary, age, position, department, sin, address, city, state, postalCode, status, phone, emergencyContact, emergencyPhone} = req.body;

        //example json
        // {
        //     "firstName": "John",
        //     "lastName": "Doe",
        //     "email": "john.doe@example",
        //     "salary": 100000,
        //     "age": 30,
        //     "position": "Manager",
        //     "department": "IT",
        //     "sin": 123456789,
        //     "address": "123 Main St",
        //     "city": "Toronto",
        //     "state": "ON",
        //     "postalCode": "M1M1M1",
        //     "status": true,
        //     "phone": "123-456-7890",
        //     "emergencyContact": "Jane Doe",
        //     "emergencyPhone": "123-456-7890"
        // }

        const employee = new Employee({firstName, lastName, email, salary, age, position, department, sin, address, city, state, postalCode, status, phone, emergencyContact, emergencyPhone});
        await employee.save();

        res.json(employee);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}



export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {firstName, lastName, email, salary, age, position, department, sin, address, city, state, postalCode, status, phone, emergencyContact, emergencyPhone} = req.body;

        const employee = await Employee.findByIdAndUpdate(id, {firstName, lastName, email, salary, age, position, department, sin, address, city, state, postalCode, status, phone, emergencyContact, emergencyPhone}, {new: true});

        if (!employee) {
            return res.status(404).json({message: 'Employee not found'});
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const employee = await Employee.findByIdAndRemove(id);

        if (!employee) {
            return res.status(404).json({message: 'Employee not found'});
        }

        res.json({message: 'Employee deleted'});
    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
}