import mongoose, { Document } from "mongoose";

interface IBusSchedule extends Document {
    busScheduleName: string;
    busScheduleStart: Date;
    busScheduleEnd: Date;
    busScheduleStatus: 'active' | 'inactive' | 'pending'; // Update enum values as needed
    busScheduleDescription: string;
    busSchedule: [
        {
            busRouteId: string;
            busRouteName: string;
            busRouteNumber: string;
            
        }
    ]
    dateCreated: Date;
}