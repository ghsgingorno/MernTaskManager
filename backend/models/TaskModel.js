import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Method to mark a task as complete
const Tasks = new mongoose.model('Task', TaskSchema);
export default  Tasks;