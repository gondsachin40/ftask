import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { TuiAppearance, TuiIcon, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import { TuiCardLarge, TuiCell, TuiHeader } from '@taiga-ui/layout';
import { Router } from '@angular/router';
interface ApiRes {
  _id: string;
  taskTitle: string;
  taskDescription: string;
  links: string[];
  tasksId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface Taskinfo {
  _id: string;
  taskTitle: string;
  taskDescription: string;
  createdAtFormatted: string;
  updatedAtFormatted: string;
  links: string[];
  tasksId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task implements OnInit {
  tasks: Taskinfo[] = [];

  constructor(
    private route: ActivatedRoute, private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<{ tasks: ApiRes[] }>(`http://localhost:3000/task/${id}`, { withCredentials: true })
        .subscribe({
          next: (response) => {
            const formattedTasks = response.tasks.map(task => ({
              ...task,
              createdAtFormatted: this.formatDate(task.createdAt),
              updatedAtFormatted: this.formatDate(task.updatedAt),
            }));
            this.tasks.push(...formattedTasks);
            console.log("Loaded tasks:", this.tasks);
          },
          error: (err) => {
            console.error("Failed to load tasks", err);
          }
        });
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  addtask() {
    let k = this.route.snapshot.paramMap.get('id');
    this.router.navigate([`/addtask/${k}`]);
  }
}
