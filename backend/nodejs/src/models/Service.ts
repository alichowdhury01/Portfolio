import mongoose, { Document } from 'mongoose';

interface IService extends Document {
    name: string;
}

interface IServiceCounter extends Document {
    _id: string;
    seq: number;
}

const serviceCounterSchema = new mongoose.Schema<IServiceCounter>({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
}, { versionKey: false });

const ServiceCounter = mongoose.model<IServiceCounter>('ServiceCounter', serviceCounterSchema);

const serviceSchema = new mongoose.Schema<IService>({
    _id: { type: Number },
    name: { type: String, required: true },
}, { versionKey: false });

serviceSchema.pre<IService>('save', async function (next) {
    try {
        if (!this._id) {
            const counter = await ServiceCounter.findByIdAndUpdate(
                { _id: 'serviceId' },
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

export { ServiceCounter, IService, IServiceCounter };
export default mongoose.model<IService>('Service', serviceSchema, 'services');