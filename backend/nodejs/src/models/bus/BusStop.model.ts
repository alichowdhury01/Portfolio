import mongoose, { Document } from "mongoose";

interface IBusStop extends Document {
    busStopName: string;
    busStopNumber: string;
    busStopStreet: string;
    busStopStreetCorner: string;
    busStopStatus: 'active' | 'inactive' | 'pending'; // Update enum values as needed
    busStopDescription: string;
    busStand: boolean;
    dateCreated: Date;
}

interface IBusStopCounter extends Document {
    _id: string;
    seq: number;
}

const busStopCounterSchema = new mongoose.Schema<IBusStopCounter>({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0},
});

const BusStopCounter = mongoose.model<IBusStopCounter>('BusStopCounter', busStopCounterSchema, 'BusStopCounter');

const busStopSchema = new mongoose.Schema<IBusStop>({
    _id: {type: Number},
    busStopName: {type: String, required: true},
    busStopNumber: {type: String, required: true},
    busStopStreet: {type: String, required: true},
    busStopStatus: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Update enum values as needed
        required: true,
    },
    busStopDescription: {type: String, default: ''},
    busStand: {type: Boolean, required: true},
    dateCreated: {type: Date, default: Date.now},
});

busStopSchema.pre<IBusStop>('save', async function (next) {
    try {
        if (!this._id) {
            const counter = await BusStopCounter.findByIdAndUpdate(
                {_id: 'busStopId'},
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

export {BusStopCounter, IBusStop, IBusStopCounter, busStopSchema};
export default mongoose.model<IBusStop>('BusStop', busStopSchema, 'BusStop');