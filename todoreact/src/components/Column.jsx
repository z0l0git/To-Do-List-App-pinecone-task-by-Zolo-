import React, { useState } from "react";
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Column({
  column,
  onAddTask,
  onDeleteTask,
  onEditTask,
  onEditColumn,
  onDeleteColumn,
  onMoveTask,
  allColumns,
}) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <Card className="w-80 flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{column.title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEditColumn(column.id)}>
                Edit Column
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteColumn(column.id)}
                className="text-red-600"
              >
                Delete Column
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {column.detail && (
          <p className="text-sm text-muted-foreground">{column.detail}</p>
        )}
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-2">
          {column.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onDelete={() => onDeleteTask(column.id, task.id)}
              onEdit={(updatedTask) =>
                onEditTask(column.id, task.id, updatedTask)
              }
              onMove={(targetColumnId) =>
                onMoveTask(task.id, column.id, targetColumnId)
              }
              allColumns={allColumns}
            />
          ))}
        </div>
      </CardContent>
      {isAddingTask ? (
        <AddTaskForm
          onAddTask={(task) => {
            onAddTask(column.id, task);
            setIsAddingTask(false);
          }}
          onCancel={() => setIsAddingTask(false)}
        />
      ) : (
        <Button
          onClick={() => setIsAddingTask(true)}
          className="mt-2 w-full bg-[#5C8374] hover:bg-[#4A6B5D] text-gray-100"
          variant="outline"
        >
          Add Task
        </Button>
      )}
    </Card>
  );
}
