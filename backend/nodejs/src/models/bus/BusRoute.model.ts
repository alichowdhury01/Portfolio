import mongoose, { Document } from "mongoose";


interface IBusRoute extends Document {
    routeName: string;
    routeNumber: string;
    routeStatus: 'active' | 'inactive' | 'pending'; // Update enum values as needed
    routeDescription: string;
    routeSchedule: any[];
    dateCreated: Date;
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
    routeSchedule: [],
    dateCreated: { type: Date, default: Date.now }
});


// First, we have a schema called busRouteSchema which represents a specific structure or blueprint for storing data related to bus routes
busRouteSchema.pre<IBusRoute>('save', async function (next) { // Sets up a pre-save hook for the busRouteSchema: This means that whenever a new bus route is being saved to the database, the code inside this function will run before the actual save happens
    try { // We wrap the code inside a try-catch block to catch any errors that might occur
        if (!this._id) { // If the bus route does not have an _id property, then we know that this is a new bus route being created

            /* To generate a unique ID, the code uses another schema called BusRouteCounter. This schema is responsible for keeping track of the current ID value. 
            *  We use the findByIdAndUpdate method to find the document in the BusRouteCounter collection with the _id of 'busRouteId'
            */
            const counter = await BusRouteCounter.findByIdAndUpdate( 
                { _id: 'busRouteId' },

                /* The code then updates the found document by incrementing the seq field by 1 using the $inc operator. 
                *  This means that the value of seq will be increased by 1 each time a new bus route is saved
                */
                { $inc: { seq: 1 } }, 

                /* The options { new: true, upsert: true } passed to findByIdAndUpdate specify that if the document is not found, 
                *  a new one should be created (upsert: true) and the updated document should be returned (new: true)
                */
                { new: true, upsert: true }
            );

           /** The updated seq value is retrieved from the counter document, and it's assigned to the _id property of the current bus route being saved. 
           *   This ensures that each bus route gets a unique ID
           */

           this._id = counter.seq;
        }
        // Finally, the next() function is called to proceed with the actual saving of the bus route to the database
        next();

    /**
     *If any error occurs during the execution of the code, it is caught in the catch block, 
     * and the next(error) function is called to pass the error to the next middleware or handler in the application  
     */
    } catch (error: any) { 
        next(error);
    }
});

export { BusRouteCounter, IBusRoute, IBusRouteCounter, busRouteSchema as BusRouteModel };
export default mongoose.model<IBusRoute>('BusRoute', busRouteSchema, 'BusRoute');
