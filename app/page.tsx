"use client";

import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MoreVertical, Trash2, CheckCircle2, Plus, GripVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function DigitalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-8 text-center">
      <Navbar />
      <div className="text-9xl font-black text-white tracking-tighter opacity-90 drop-shadow-2xl">
        {time || "00:00"}
      </div>
      <p className="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mt-2">Current Time</p>
    </div>
  );
}

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [deleteType, setDeleteType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load Tasks from LocalStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("garzon-tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save Tasks to LocalStorage
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("garzon-tasks", JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError(true);
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputValue("");
    setError(false);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  const openDeleteModal = (type) => {
    setDeleteType(type);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteType === "all") {
      setTasks([]);
    } else if (deleteType === "completed") {
      setTasks(tasks.filter(t => !t.completed));
    }
    setIsModalOpen(false);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#121214] flex flex-col items-center justify-center p-4 font-sans selection:bg-[#5865f2] selection:text-white">
      
      <DigitalClock />

      <Card className="w-full max-w-md bg-[#1a1a1e] border-0 shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-white text-xl font-bold">Garzon To-Do</CardTitle>
          
          {/*burger*/}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#2c2c31] border-zinc-700 text-white">
              <DropdownMenuItem onClick={() => openDeleteModal("completed")} className="cursor-pointer hover:bg-zinc-700 focus:bg-zinc-700">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Clear Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDeleteModal("all")} className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-zinc-700 focus:bg-zinc-700">
                <Trash2 className="mr-2 h-4 w-4" /> Clear All Tasks
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>

        <CardContent>
          <form onSubmit={addTask} className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (error) setError(false);
              }}
              className="bg-[#121214] border-zinc-800 text-white placeholder:text-zinc-600 focus-visible:ring-[#5865f2]"
            />
            <Button 
              type="submit" 
              className="bg-[#5865f2] hover:bg-[#4752c4] text-white transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </form>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4 animate-pulse">
              Please enter a task name!
            </p>
          )}

          {/*todolist*/}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <ul 
                  {...provided.droppableProps} 
                  ref={provided.innerRef} 
                  className="space-y-2 min-h-[50px]"
                >
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`
                            group flex items-center justify-between p-3 rounded-md transition-colors border border-transparent
                            ${snapshot.isDragging ? "bg-[#36363c] shadow-xl border-[#5865f2]" : "bg-[#2c2c31] hover:bg-[#323238]"}
                          `}
                          >
                            <div className="flex items-center gap-3 overflow-hidden">
                              {/* Drag Handle */}
                              <div {...provided.dragHandleProps} className="cursor-grab text-zinc-600 hover:text-zinc-400">
                                <GripVertical className="h-4 w-4" />
                              </div>

                              {/* Checkbox */}
                              <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => toggleTask(task.id)}
                                className="border-zinc-500 data-[state=checked]:bg-[#489763] data-[state=checked]:border-[#489763]" />

                              {/* Text */}
                              <span
                                className={`truncate text-sm font-medium transition-all ${task.completed ? "text-zinc-500 line-through" : "text-zinc-100"}`}
                              >
                                {task.text}
                              </span>
                            </div>

                            {/* Delete Button (Only shows on hover) */}
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-zinc-600 hover:text-red-400 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity px-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </li>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>

          {tasks.length === 0 && (
            <p className="text-center text-zinc-600 text-sm mt-8 italic">
              No tasks yet
            </p>
          )}
        </CardContent>
      </Card>

      {/*modal*/}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#1a1a1e] border-zinc-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Are you sure?</DialogTitle>
            <DialogDescription className="text-zinc-400">
              {deleteType === "all" 
                ? "This will permanently delete ALL tasks from your list." 
                : "This will remove all tasks marked as completed."}
              <br/>This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button 
              variant="ghost" 
              onClick={() => setIsModalOpen(false)}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white border-0"
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}