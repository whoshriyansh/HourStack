// models/User.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  fromGoogle: boolean;
  trackedTime: Types.ObjectId[];
  projects: Types.ObjectId[];
  tasks: Types.ObjectId[];
  timestamp: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: function () {
        return !this.fromGoogle;
      },
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    trackedTime: [{ type: Schema.Types.ObjectId, ref: "TrackedTime" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);
