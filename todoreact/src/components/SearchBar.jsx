import React from "react";
import { Input } from "@/components/ui/input";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
