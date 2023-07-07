import mongoose, { Document } from "mongoose";
import User, {userSchema} from "../User";

interface IBus extends Document {
    busNumber: string;
    busModel: string;
    busMake: string;
    busYear: string;
    busCapacity: string;
    busEngineNumber: string;
    busEngineType: 'petrol' | 'diesel' | 'electric' | 'hybrid'; // Update enum values as needed
    busChasisNumber: string;
    busStatus: 'active' | 'inactive' | 'pending'; // Update enum values as needed
    busPlateNumber: string;
    dateCreated: Date;
    busSchedule: [Array<object>];

}

interface IBusCounter extends Document {
    _id: string;
    seq: number;
}

const busCounterSchema = new mongoose.Schema<IBusCounter>({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});

const BusCounter = mongoose.model<IBusCounter>('BusCounter', busCounterSchema);

const busSchema = new mongoose.Schema<IBus>(
    {
        _id: { type: Number },
        busNumber: { type: String, required: true },
        busModel: { type: String, required: true },
        busMake: { type: String, required: true },
        busYear: { type: String, required: true },
        busCapacity: { type: String, required: true },
        busEngineNumber: { type: String, required: true },
        busEngineType: {
            type: String,
            enum: ['petrol', 'diesel', 'electric', 'hybrid'], // Update enum values as needed
            required: true,
        },
        busChasisNumber: { type: String, required: true },
        busStatus: {
            type: String,
            enum: ['active', 'inactive', 'pending'], // Update enum values as needed
            required: true,
        },
        busPlateNumber: { type: String, required: true },
        dateCreated: { type: Date, default: Date.now },
        busSchedule: [
            {
                schedule: { 
                    type: userSchema, unique: true
                },
            }
        ]
    }
);

busSchema.pre<IBus>('save', async function (next) {
    try {
        if (!this._id) {
            const counter = await BusCounter.findByIdAndUpdate(
                { _id: 'busId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );

            this._id = counter.seq;
        }
        next();
    } catch (error: any) {
        next(error);
    }
});

export { BusCounter, IBus, IBusCounter}
export default mongoose.model<IBus>('Bus', busSchema, 'buses');


