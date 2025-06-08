// models/Project.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  color: "red" | "blue" | "green" | "yellow" | "orange" | "purple" | "white";
  tasks: Types.ObjectId[];
  createdBy: Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    color: {
      type: String,
      enum: ["red", "blue", "green", "yellow", "orange", "purple"],
      default: "white",
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default (mongoose.models.Project as mongoose.Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);
