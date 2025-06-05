// models/TrackedTime.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITrackedTime extends Document {
  name: string;
  projects: Types.ObjectId;
  createdBy: Types.ObjectId;
  duration: number;
  startedAt: Date;
  endedAt: Date;
}

const TrackedTimeSchema = new Schema<ITrackedTime>(
  {
    name: { type: String },
    projects: { type: Schema.Types.ObjectId, ref: "Project" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    duration: { type: Number },
    startedAt: { type: Date },
    endedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.TrackedTime ||
  mongoose.model<ITrackedTime>("TrackedTime", TrackedTimeSchema);
