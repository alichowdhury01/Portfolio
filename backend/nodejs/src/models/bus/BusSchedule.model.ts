import mongoose, { Document } from "mongoose";

interface IBusSchedule extends Document {
    busScheduleNumber: string;
    busScheduleStart: Date;
    busScheduleEnd: Date;
    busScheduleStatus: 'active' | 'inactive' | 'pending'; // Update enum values as needed
    busScheduleDescription: string;
    busSchedule: [
        {
            shedule:{
                            status: 'active' | 'inactive' | 'pending'; // Update enum values as needed
            arrivalTime: Date;
            busStop: []
            }

        }
    ]
    dateCreated: Date;
}

interface IBusScheduleCounter extends Document {
    _id: string;
    seq: number;
}

const busScheduleCounterSchema = new mongoose.Schema<IBusScheduleCounter>({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0},
});

const BusScheduleCounter = mongoose.model<IBusScheduleCounter>('BusScheduleCounter', busScheduleCounterSchema, 'BusScheduleCounter');

const busScheduleSchema = new mongoose.Schema<IBusSchedule>({
    _id: {type: Number},
    busScheduleNumber: {type: String, required: true},
    busScheduleStart: {type: Date},
    busScheduleEnd: {type: Date},
    busScheduleStatus: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Update enum values as needed
        required: true,
    },
    busScheduleDescription: {type: String, default: ''},
    busSchedule: [
        {
            status: {
                type: String,
                enum: ['active', 'inactive', 'pending'], // Update enum values as needed
            },
            arrivalTime: {type: Date},
            busStop: []
        }
    ],
    dateCreated: {type: Date, default: Date.now},
});

busScheduleSchema.pre<IBusSchedule>('save', async function (next) {
    try {
        if (!this._id) {
            const counter = await BusScheduleCounter.findByIdAndUpdate(
                {_id: 'busScheduleId'},
                {$inc: {seq: 1}},
                {new: true, upsert: true}
            );

            this._id = counter.seq;
        }
        next();
    } catch (error: any) {
        next(error);
    }
});

export {BusScheduleCounter, IBusSchedule, IBusScheduleCounter, busScheduleSchema};
export default mongoose.model<IBusSchedule>('BusSchedule', busScheduleSchema, 'BusSchedule');