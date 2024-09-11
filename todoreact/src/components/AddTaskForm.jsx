import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function AddTaskForm({ onAddTask, onCancel }) {
  const [task, setTask] = useState({
    text: "",
    description: "",
    priority: "",
    dueDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.text.trim()) {
      onAddTask(task);
      setTask({ text: "", description: "", priority: "", dueDate: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 space-y-2">
      <Input
        type="text"
        value={task.text}
        onChange={(e) => setTask({ ...task, text: e.target.value })}
        placeholder="Task title"
        required
      />
      <Textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
      />
      <Select
        value={task.priority}
        onValueChange={(value) => setTask({ ...task, priority: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          {priorities.map((priority) => (
            <SelectItem key={priority.value} value={priority.value}>
              {priority.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />
      <div className="flex justify-end space-x-2">
        <Button type="submit">Add Task</Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
