import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Pencil, Trash2, MoveRight } from "lucide-react";
import { FaRegTrashAlt, FaPen, FaLongArrowAltRight } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function Task({ task, onDelete, onEdit, onMove, allColumns }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isEditing) {
    return (
      <Card className="p-2">
        <CardContent className="p-0 space-y-2">
          <Input
            value={editedTask.text}
            onChange={(e) =>
              setEditedTask({ ...editedTask, text: e.target.value })
            }
            placeholder="Task title"
          />
          <Textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            placeholder="Description"
          />
          <Select
            value={editedTask.priority}
            onValueChange={(value) =>
              setEditedTask({ ...editedTask, priority: value })
            }
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
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={handleEdit} size="sm">
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-2">
      <CardContent className="p-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{task.text}</h3>
            {task.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {task.description}
              </p>
            )}
            <div className="flex space-x-2 mt-2">
              {task.priority && (
                <span
                  className={`text-xs px-2 py-1 rounded ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              )}
              {task.dueDate && (
                <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex space-x-1">
            <Button
              onClick={() => setIsEditing(true)}
              size="icon"
              variant="ghost"
            >
              <FaPen className="h-4 w-4" />
            </Button>
            <Button onClick={onDelete} size="icon" variant="ghost">
              <FaRegTrashAlt className="h-4 w-4" color="red" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <FaLongArrowAltRight className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {allColumns?.map((column) => (
                  <DropdownMenuItem
                    key={column.id}
                    onSelect={() => onMove(column.id)}
                  >
                    Move to {column.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
