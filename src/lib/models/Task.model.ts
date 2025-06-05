// models/Task.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  name: string;
  isCompleted: boolean;
  createdBy: Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
    name: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", TaskSchema);
