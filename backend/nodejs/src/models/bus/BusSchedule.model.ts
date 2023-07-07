import mongoose, { Document } from "mongoose";

interface IBusSchedule extends Document {
    busSchedule: string;
    busScheduleStatus: 'active' | 'inactive' | 'pending'; // Update enum values as needed
    dateCreated: Date;
}