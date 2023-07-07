import mongoose, {Document} from "mongoose";

interface IBusRoute extends Document {
    routeName: string;
    routeNumber: string;
    routeStatus: 'active' | 'inactive' | 'pending'; // Update enum values as needed
    routeDescription: string;
    dateCreated: Date;
    routeStops: [Array<object>];
}

interface IBusRouteCounter extends Document {
    _id: string;
    seq: number;
}

const busRouteCounterSchema = new mongoose.Schema<IBusRouteCounter>({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0},
});

const BusRouteCounter = mongoose.model<IBusRouteCounter>('BusRouteCounter', busRouteCounterSchema, 'BusRouteCounter');

const busRouteSchema = new mongoose.Schema<IBusRoute>({
    _id: {type: Number},
    routeName: {type: String, required: true},
    routeNumber: {type: String, required: true},    
    routeStatus: {
        type: String,
        enum: ['active', 'inactive', 'pending'], // Update enum values as needed
        required: true,
    },
    routeDescription: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now},
    routeStops: [
        {
        type: String, 
        },
    ],
});