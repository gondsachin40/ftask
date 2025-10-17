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
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  protected readonly form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    links: new FormControl(this.links),
  });
  edittask(id:String){
    console.log(id)
    this.router.navigate(['/edit',id])
  }
  deletetask(id:String){
    console.log(id)
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
    if (id) {
      this.http
        .get<{ tasks: ApiRes[] }>(`http://localhost:3000/task/${id}`, { withCredentials: true })
        .subscribe({
          next: (response) => {
            const formattedTasks = response.tasks.map((task) => ({
              ...task,
              createdAtFormatted: this.formatDate(task.createdAt),
              updatedAtFormatted: this.formatDate(task.updatedAt),
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
