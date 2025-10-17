import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiNotification,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import { TuiFieldErrorPipe, TuiSegmented, TuiSwitch, TuiTooltip } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader, TuiCardMedium } from '@taiga-ui/layout';
import { TuiInputChip } from '@taiga-ui/kit';

import {
  TuiInputDateModule,
  TuiTextfieldControllerModule,
  TuiUnfinishedValidator,
} from '@taiga-ui/legacy';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { EditTask } from '../edit-task/edit-task';
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
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    TuiInputChip,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    TuiUnfinishedValidator,
    TuiForm,
    TuiHeader,
    TuiIcon,
    TuiNotification,
    TuiSegmented,
    TuiSwitch,
    TuiTextfield,
    TuiTitle,
    TuiTooltip,
    TuiCardMedium
  ],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task implements OnInit {
  tasks: Taskinfo[] = [];
  links: string[] = [];
  @ViewChild('cardContainer') cardContainer!: ElementRef<HTMLDivElement>;
  ngAfterViewInit() {
    const el = this.cardContainer.nativeElement;
    el.addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    });
  }
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  protected readonly form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    links: new FormControl(this.links),
  });
  edittask(id: String) {
    console.log(id)
    this.router.navigate(['/edit', id])
  }
  deletetask(id: string): void {
    if (!id) return;
    console.log(id);
    this.http
      .post(`http://localhost:3000/task/deleteTask/${id}`, {}, { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          this.tasks = this.tasks.filter(task => task._id !== id);
          console.log('Updated task list:', this.tasks);
        },
        error: (error) => {
          console.error('API Error:', error);
        },
      });
  }

  onSubmit() {
    const body = {
      taskTitle: this.form.value.title,
      taskDescription: this.form.value.description,
      links: this.form.value.links,
      tasksId: this.route.snapshot.paramMap.get('id'),
    };
    this.http
      .post('http://localhost:3000/task/addTask', body, { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log('API Response:', response);

          const createdAtFormatted = this.formatDate(response.createdAt);
          const updatedAtFormatted = this.formatDate(response.updatedAt);

          const formattedTask: Taskinfo = {
            _id: response._id,
            taskTitle: response.taskTitle,
            taskDescription: response.taskDescription,
            links: response.links,
            tasksId: response.tasksId,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt,
            createdAtFormatted,
            updatedAtFormatted,
            __v: response.__v,
          };

          this.tasks.push(formattedTask);

          // this.router.navigate(['/task', body.tasksId]);
        },
        error: (error) => {
          console.error('API Error:', error);
        },
      });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('page load task')
    if (id) {
      this.http
        .get<{ tasks: (ApiRes | null)[] }>(`http://localhost:3000/task/getObjective/${id}`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response) => {
            const formattedTasks = response.tasks
              .filter((task): task is ApiRes => task !== null && typeof task === 'object') // filter out nulls
              .map((task) => ({
                ...task,
                createdAtFormatted: task.createdAt ? this.formatDate(task.createdAt) : 'N/A',
                updatedAtFormatted: task.updatedAt ? this.formatDate(task.updatedAt) : 'N/A',
              }));

            this.tasks.push(...formattedTasks);
            console.log('Loaded tasks:', this.tasks);
          },
          error: (err) => {
            console.error('Failed to load tasks', err);
          },
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
