import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    modules: {
      type: String,
      default: "Multiple Modules"
    },
    availableDate: {
      type: Date,
    },
    availableUntilDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    points: {
      type: Number,
    },
    description: {
      type: String,
    }
    },
  { collection: "assignments", timestamps: true}
);
export default assignmentSchema;

