import mongoose, { Document } from "mongoose";

interface IEmployee extends Document {
    firstName: string;
    lastName: string;
    email: string;
    salary: number;
    age: number;
    position: string;
    department: string;
    date: Date;
    sin: number;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    status: boolean;
    phone: string;
    emergencyContact: string;
    emergencyPhone: string;
}

interface IEmployeeCounter extends Document {
    _id: string;
    seq: number;
}

const employeeCounterSchema = new mongoose.Schema<IEmployeeCounter>({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
}, { versionKey: false });

const EmployeeCounter = mongoose.model<IEmployeeCounter>('EmployeeCounter', employeeCounterSchema);

const employeeSchema = new mongoose.Schema<IEmployee>({
    _id: { type: Number }, // Add _id field with type number
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    salary: { type: Number, required: true },
    age: { type: Number, required: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: Date, default: Date.now },
    sin: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: {type: String, required: true},
    postalCode: { type: String, required: true },
    status: { type: Boolean, required: true},
    phone: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    emergencyPhone: { type: String, required: true },
}, { versionKey: false });

employeeSchema.pre<IEmployee>('save', async function (next) {
    try {
        if(!this._id) {
            const counter = await EmployeeCounter.findByIdAndUpdate(
                { _id: 'employeeId' },
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

export default mongoose.model("Employee", employeeSchema, "employees");
