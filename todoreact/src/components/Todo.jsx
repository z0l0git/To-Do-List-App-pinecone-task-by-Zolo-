import React, { useState, useEffect } from "react";
import Column from "./Column";
import AddColumnForm from "./AddColumnForm";
import EditColumnForm from "./EditColumnForm";
import DeleteColumnDialog from "./DeleteColumnDialog";
import SearchBar from "./SearchBar";
import DeleteTaskDialog from "./DeleteTaskDialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Todo() {
  const [editingColumn, setEditingColumn] = useState(null);
  const [isEditColumnModalOpen, setIsEditColumnModalOpen] = useState(false);

  const [isDeleteColumnDialogOpen, setIsDeleteColumnDialogOpen] =
    useState(false);

  const [columnToDelete, setColumnToDelete] = useState(null);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [columns, setColumns] = useState(() => {
    return [
      { id: "todo", title: "To Do", detail: "Tasks to be done", tasks: [] },
      {
        id: "inprogress",
        title: "In Progress",
        detail: "Tasks currently being worked on",
        tasks: [],
      },
      { id: "done", title: "Done", detail: "Completed tasks", tasks: [] },
    ];
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load columns from sessionStorage on client-side
    const storedColumns = sessionStorage.getItem("columns");
    if (storedColumns) {
      setColumns(JSON.parse(storedColumns));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save columns to sessionStorage on client-side
    if (isLoaded) {
      sessionStorage.setItem("columns", JSON.stringify(columns));
    }
  }, [columns, isLoaded]);

  const addColumn = (title) => {
    const newColumn = {
      id: Date.now().toString(),
      title: title.trim(),
      detail: "",
      tasks: [],
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const editColumn = (columnId) => {
    const column = columns.find((col) => col.id === columnId);
    if (column) {
      setEditingColumn(column);
      setIsEditColumnModalOpen(true);
    }
  };

  const handleEditColumn = (updatedColumn) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === updatedColumn.id ? updatedColumn : column
      )
    );
    setIsEditColumnModalOpen(false);
    setEditingColumn(null);
  };

  const deleteColumn = (columnId) => {
    setColumnToDelete(columnId);
    setIsDeleteColumnDialogOpen(true);
  };

  const handleDeleteColumn = () => {
    if (columnToDelete) {
      setColumns((prevColumns) =>
        prevColumns.filter((column) => column.id !== columnToDelete)
      );
      setIsDeleteColumnDialogOpen(false);
      setColumnToDelete(null);
    }
  };

  const addTask = (columnId, newTask) => {
    const task = { ...newTask, id: Date.now().toString() };
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, task] }
          : column
      )
    );
  };

  const deleteTask = (columnId, taskId) => {
    setTaskToDelete({ columnId, taskId });
    setIsDeleteTaskDialogOpen(true);
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === taskToDelete.columnId
            ? {
                ...column,
                tasks: column.tasks.filter(
                  (task) => task.id !== taskToDelete.taskId
                ),
              }
            : column
        )
      );
      setIsDeleteTaskDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const editTask = (columnId, taskId, updatedTask) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
              ),
            }
          : column
      )
    );
  };

  const moveTask = (taskId, sourceColumnId, targetColumnId) => {
    if (sourceColumnId === targetColumnId) return; // Do nothing if moving to the same column

    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find((col) => col.id === sourceColumnId);
      const taskToMove = sourceColumn.tasks.find((task) => task.id === taskId);

      return prevColumns.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };
        }
        if (column.id === targetColumnId) {
          return { ...column, tasks: [...column.tasks, taskToMove] };
        }
        return column;
      });
    });
  };

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter(
      (task) =>
        task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div>
      <div className="mb-4">
        <AddColumnForm onAddColumn={addColumn} />
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex space-x-4 overflow-x-auto pb-4 justify-center">
        {filteredColumns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
            onEditTask={editTask}
            onEditColumn={editColumn}
            onDeleteColumn={deleteColumn}
            onMoveTask={moveTask}
            allColumns={columns}
          />
        ))}
      </div>
      <Dialog
        open={isEditColumnModalOpen}
        onOpenChange={setIsEditColumnModalOpen}
      >
        <DialogContent>
          <EditColumnForm
            column={editingColumn}
            onSave={handleEditColumn}
            onCancel={() => setIsEditColumnModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
      <DeleteColumnDialog
        isOpen={isDeleteColumnDialogOpen}
        onClose={() => setIsDeleteColumnDialogOpen(false)}
        onConfirm={handleDeleteColumn}
      />
      <DeleteTaskDialog
        isOpen={isDeleteTaskDialogOpen}
        onClose={() => setIsDeleteTaskDialogOpen(false)}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
}
