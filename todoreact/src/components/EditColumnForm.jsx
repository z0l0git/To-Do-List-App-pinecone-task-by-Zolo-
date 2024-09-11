import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditColumnForm({ column, onSave, onCancel }) {
  const [editedColumn, setEditedColumn] = useState(column);

  useEffect(() => {
    setEditedColumn(column);
  }, [column]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editedColumn && editedColumn.title.trim()) {
      onSave(editedColumn);
    }
  };

  if (!editedColumn) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Column Title
        </label>
        <Input
          id="title"
          type="text"
          value={editedColumn.title}
          onChange={(e) =>
            setEditedColumn({ ...editedColumn, title: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-700"
        >
          Column Detail
        </label>
        <Textarea
          id="detail"
          value={editedColumn.detail}
          onChange={(e) =>
            setEditedColumn({ ...editedColumn, detail: e.target.value })
          }
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="submit">Save Changes</Button>
        <Button onClick={onCancel} variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
