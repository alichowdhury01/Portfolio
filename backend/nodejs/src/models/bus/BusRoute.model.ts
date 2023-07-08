import mongoose, { Document } from "mongoose";

interface IBusRoute extends Document {
    routeName: string;
    routeNumber: string;
    routeStatus: 'active' | 'inactive' | 'pending'; // Update enum values as needed
    routeDescription: string;
    dateCreated: Date;
    routeStops: any[];
}

interface IBusRouteCounter extends Document {
    _id: string;
    seq: number;
}

const busRouteCounterSchema = new mongoose.Schema<IBusRouteCounter>({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});

const BusRouteCounter = mongoose.model<IBusRouteCounter>('BusRouteCounter', busRouteCounterSchema, 'BusRouteCounter');

const busRouteSchema = new mongoose.Schema<IBusRoute>({
    _id: { type: Number },
    routeName: { type: String, required: true },
    routeNumber: { type: String, required: true },
    routeStatus: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Update enum values as needed
        required: true,
    },
    routeDescription: { type: String },
    dateCreated: { type: Date, default: Date.now },
    routeStops: [],
});

busRouteSchema.pre<IBusRoute>('save', async function (next) {
    try {
        if (!this._id) {
            const counter = await BusRouteCounter.findByIdAndUpdate(
                { _id: 'busRouteId' },
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

export { BusRouteCounter, IBusRoute, IBusRouteCounter, busRouteSchema as BusRouteModel };
export default mongoose.model<IBusRoute>('BusRoute', busRouteSchema, 'BusRoute');
