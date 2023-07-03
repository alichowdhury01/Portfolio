import mongoose, { Schema, Document } from 'mongoose';

interface IService extends Document {
  name: string;
  description: string;
  startHour: string;
  endHour: string;
  day: string;
  pab: {
    number: string;
    phone: string;
  };
}

export interface ITenant extends Document {
  _id: number; // Change _id type to number for auto-incrementing ID
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  apartmentNumber: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  services: IService[];
}

interface ITenantCounter extends Document {
  _id: string;
  seq: number;
}

const tenantCounterSchema = new mongoose.Schema<ITenantCounter>(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  },
  { versionKey: false }
);

const TenantCounter = mongoose.model<ITenantCounter>('TenantCounter', tenantCounterSchema);

const serviceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startHour: { type: String, required: true },
    endHour: { type: String, required: true },
    day: { type: String, required: true },
    pab: {
      number: { type: String, required: true },
      phone: { type: String, required: true },
    },
  },
  { _id: false }
);

const tenantSchema = new Schema<ITenant>({
  _id: { type: Number }, // Add _id field with type number
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  apartmentNumber: { type: String, required: true },
  emergencyContactName: { type: String, required: true },
  emergencyContactPhone: { type: String, required: true },
  services: [serviceSchema],
});

tenantSchema.pre<ITenant>('save', async function (next) {
  try {
    const tenant = this;
    if (!tenant._id) {
      const counter = await TenantCounter.findByIdAndUpdate(
        { _id: 'tenantId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      tenant._id = counter.seq;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

export default mongoose.model<ITenant>('Tenant', tenantSchema, 'tenants');
