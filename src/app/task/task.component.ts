import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../models/task.model';
import { UserService } from '../_services/user.service'; // Será TaskService

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;
  editingTask: Task | null = null;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService // TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.userService.getTasks().subscribe({
      next: (tasks) => this.tasks = tasks,
      error: (err) => this.errorMessage = 'Error loading tasks'
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    if (this.editingTask) {
      this.userService.updateTask(this.editingTask.id!, this.taskForm.value).subscribe({
        next: (updated) => {
          const index = this.tasks.findIndex(t => t.id === updated.id);
          if (index !== -1) this.tasks[index] = updated;
          this.cancelEdit();
        },
        error: (err) => this.errorMessage = 'Error updating task'
      });
    } else {
      this.userService.createTask(this.taskForm.value).subscribe({
        next: (newTask) => {
          this.tasks.push(newTask);
          this.taskForm.reset();
        },
        error: (err) => this.errorMessage = 'Error creating task'
      });
    }
  }

  editTask(task: Task): void {
    this.editingTask = task;
    this.taskForm.patchValue({
      title: task.title,
      description: task.description
    });
  }

  cancelEdit(): void {
    this.editingTask = null;
    this.taskForm.reset();
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure?')) {
      this.userService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
        },
        error: (err) => this.errorMessage = 'Error deleting task'
      });
    }
  }

  toggleCompleted(task: Task): void {
    const updated = { ...task, completed: !task.completed };
    this.userService.updateTask(task.id!, updated).subscribe({
      next: (res) => {
        task.completed = res.completed;
      },
      error: (err) => this.errorMessage = 'Error updating task'
    });
  }
}