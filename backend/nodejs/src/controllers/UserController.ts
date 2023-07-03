import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || '';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);

    res.json({ token, user: { accountType : user.accountType } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



export const createUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, status, accountType } = req.body;

    //example json
    // {
    //     "firstName": "John",
    //     "lastName": "Doe",
    //     "email": "john.doe@example",
    //     "password": "password"
    // }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds


    const user = new User({ firstName, lastName, email, password: hashedPassword, status, accountType });
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, status, accountType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt of 10 rounds


    const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, password: hashedPassword, status, accountType }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
