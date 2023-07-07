import mongoose, { Document } from 'mongoose';


interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: 'active' | 'inactive' | 'pending'; // Update enum values as needed
  accountType: 'admin' | 'manager' | 'tenant' | "empoyee"; // Update enum values as needed
  date: Date;
}


interface IUserCounter extends Document {
  _id: string;
  seq: number;
}

const userCounterSchema = new mongoose.Schema<IUserCounter>({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
}, { versionKey: false });

const UserCounter = mongoose.model<IUserCounter>('UserCounter', userCounterSchema);

const userSchema = new mongoose.Schema<IUser>(
  {
    _id: { type: Number },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'], // Update enum values as needed
      default: 'active',
    },
    accountType: {
      type: String,
      enum: ['admin', 'manager', 'tenant', 'emloyee'], // Update enum values as needed
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  { versionKey: false } // Disable versioning
);


userSchema.pre<IUser>('save', async function (next) {
  try {
    if (!this._id) {
      const counter = await UserCounter.findByIdAndUpdate(
        { _id: 'userId' },
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

export { UserCounter, IUser, IUserCounter, userSchema };
export default mongoose.model<IUser>('User', userSchema, 'users');
