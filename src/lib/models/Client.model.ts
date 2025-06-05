// models/Client.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClient extends Document {
  name: string;
  budget: number;
  websiteUrl: string;
  tasks: Types.ObjectId[];
  projects: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true },
    budget: { type: Number, required: true },
    websiteUrl: { type: String },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Client ||
  mongoose.model<IClient>("Client", ClientSchema);
