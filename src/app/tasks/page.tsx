'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Calendar, User, Tag } from 'lucide-react';
import { LayoutWrapper } from '@/components/layout-wrapper';
import {
  KanbanProvider,
  KanbanBoard,
  KanbanHeader,
  KanbanCards,
  KanbanCard,
  type DragEndEvent,
} from '@/components/ui/shadcn-io/kanban';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Priority = 'low' | 'medium' | 'high' | 'urgent';

type Task = {
  id: string;
  name: string;
  column: string;
  description?: string;
  priority: Priority;
  assignee?: string;
  dueDate?: string;
  tags: string[];
  createdAt: string;
};

type Column = {
  id: string;
  name: string;
};

const columns: Column[] = [
  { id: 'todo', name: 'To Do' },
  { id: 'in-progress', name: 'In Progress' },
  { id: 'review', name: 'Review' },
  { id: 'done', name: 'Done' },
];

const priorityColors: Record<Priority, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const initialTasks: Task[] = [
  {
    id: '1',
    name: 'Design landing page',
    column: 'todo',
    description: 'Create wireframes and mockups for the new landing page',
    priority: 'high',
    assignee: 'John Doe',
    dueDate: '2024-01-15',
    tags: ['design', 'frontend'],
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Implement authentication',
    column: 'in-progress',
    description: 'Set up user authentication with NextAuth.js',
    priority: 'urgent',
    assignee: 'Jane Smith',
    dueDate: '2024-01-10',
    tags: ['backend', 'security'],
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Write unit tests',
    column: 'review',
    description: 'Add comprehensive unit tests for the API endpoints',
    priority: 'medium',
    assignee: 'Bob Johnson',
    dueDate: '2024-01-20',
    tags: ['testing', 'backend'],
    createdAt: '2024-01-03',
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    name: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    tags: [],
    column: 'todo',
  });

  const handleDataChange = (newData: Task[]) => {
    setTasks(newData);
  };

  const handleCreateTask = () => {
    if (!newTask.name) return;

    const task: Task = {
      id: Date.now().toString(),
      name: newTask.name,
      column: newTask.column || 'todo',
      description: newTask.description || '',
      priority: newTask.priority || 'medium',
      assignee: newTask.assignee || '',
      dueDate: newTask.dueDate || '',
      tags: newTask.tags || [],
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    setNewTask({
      name: '',
      description: '',
      priority: 'medium',
      assignee: '',
      dueDate: '',
      tags: [],
      column: 'todo',
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditTask = () => {
    if (!editingTask) return;

    setTasks(tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    ));
    setEditingTask(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const openEditDialog = (task: Task) => {
    setEditingTask({ ...task });
    setIsEditDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const parseTagsInput = (input: string): string[] => {
    return input.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  };

  const tagsToString = (tags: string[]): string => {
    return tags.join(', ');
  };

  return (
    <LayoutWrapper>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Task Management</h1>
            <p className="text-muted-foreground">
              Organize and track your tasks with drag-and-drop kanban boards
            </p>
          </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your kanban board.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name">Task Name</label>
                <Input
                  id="name"
                  value={newTask.name || ''}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  placeholder="Enter task name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description">Description</label>
                <Textarea
                  id="description"
                  value={newTask.description || ''}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="priority">Priority</label>
                  <Select
                    value={newTask.priority || 'medium'}
                    onValueChange={(value: Priority) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="column">Column</label>
                  <Select
                    value={newTask.column || 'todo'}
                    onValueChange={(value) => setNewTask({ ...newTask, column: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column.id} value={column.id}>
                          {column.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="assignee">Assignee</label>
                <Input
                  id="assignee"
                  value={newTask.assignee || ''}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  placeholder="Enter assignee name"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="dueDate">Due Date</label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate || ''}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="tags">Tags (comma-separated)</label>
                <Input
                  id="tags"
                  value={tagsToString(newTask.tags || [])}
                  onChange={(e) => setNewTask({ ...newTask, tags: parseTagsInput(e.target.value) })}
                  placeholder="frontend, backend, urgent"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateTask}>
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="h-[calc(100vh-200px)]">
        <KanbanProvider
          columns={columns}
          data={tasks}
          onDataChange={handleDataChange}
        >
          {(column) => (
            <KanbanBoard key={column.id} id={column.id}>
              <KanbanHeader className="flex items-center justify-between">
                <span>{column.name}</span>
                <Badge variant="secondary">
                  {tasks.filter(task => task.column === column.id).length}
                </Badge>
              </KanbanHeader>
              <KanbanCards id={column.id}>
                {(task) => (
                  <KanbanCard key={task.id} {...task} className="group">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-sm leading-tight">{task.name}</h3>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-accent"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              openEditDialog(task);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteTask(task.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <Badge className={priorityColors[task.priority]} variant="secondary">
                          {task.priority}
                        </Badge>
                      </div>
                      
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <Tag className="w-2 h-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        {task.assignee && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{task.assignee}</span>
                          </div>
                        )}
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(task.dueDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </KanbanCard>
                )}
              </KanbanCards>
            </KanbanBoard>
          )}
        </KanbanProvider>
      </div>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task here.
            </DialogDescription>
          </DialogHeader>
          {editingTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-name">Task Name</label>
                <Input
                  id="edit-name"
                  value={editingTask.name}
                  onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-description">Description</label>
                <Textarea
                  id="edit-description"
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="edit-priority">Priority</label>
                  <Select
                    value={editingTask.priority}
                    onValueChange={(value: Priority) => setEditingTask({ ...editingTask, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="edit-column">Column</label>
                  <Select
                    value={editingTask.column}
                    onValueChange={(value) => setEditingTask({ ...editingTask, column: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column.id} value={column.id}>
                          {column.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-assignee">Assignee</label>
                <Input
                  id="edit-assignee"
                  value={editingTask.assignee || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, assignee: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-dueDate">Due Date</label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={editingTask.dueDate || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-tags">Tags (comma-separated)</label>
                <Input
                  id="edit-tags"
                  value={tagsToString(editingTask.tags)}
                  onChange={(e) => setEditingTask({ ...editingTask, tags: parseTagsInput(e.target.value) })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleEditTask}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </LayoutWrapper>
  );
}