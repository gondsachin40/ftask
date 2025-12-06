import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  completed: boolean; /* Add completed status */
}
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,

  ],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task implements OnInit {
  tasks: Taskinfo[] = [];
  links: string[] = [];
  members: string[] = [];
  @ViewChild('cardContainer', { static: false }) cardContainer!: ElementRef<HTMLDivElement>
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }
  protected readonly form = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    links: new FormControl<string[]>([], { nonNullable: false }),
  });

  addLink(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    if (value) {
      const currentLinks = this.form.get('links')?.value || [];
      this.form.get('links')?.setValue([...currentLinks, value]);
      input.value = '';
    }
    event.preventDefault();
  }

  removeLink(linkToRemove: string) {
    const currentLinks = this.form.get('links')?.value || [];
    this.form.get('links')?.setValue(currentLinks.filter((link: string) => link !== linkToRemove));
  }

  markAsDone(task: Taskinfo): void {
    const newStatus = !task.completed;
    this.http.post<any>(`https://taskshare-1d4b.onrender.com/task/updateTaskStatus/${task._id}`, { completed: newStatus }, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log('Task status updated:', response);
          task.completed = newStatus; // Update UI immediately
        },
        error: (error) => {
          console.error('Failed to update task status:', error); // Log full error object
          alert('Failed to update task status.');
        }
      });
  }

  edittask(id: String) {
    console.log(id)
    this.router.navigate(['/edit', id])
  }
  deletetask(id: string): void {
    if (!id) return;
    console.log(id);
    this.http
      .post(`https://taskshare-1d4b.onrender.com/task/deleteTask/${id}`, {}, { withCredentials: true })
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
      .post('https://taskshare-1d4b.onrender.com/task/addTask', body, { withCredentials: true })
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
            completed: false, // Initialize completed status
          };

          this.tasks.push(formattedTask);

          // this.router.navigate(['/task', body.tasksId]);
        },
        error: (error) => {
          console.error('API Error:', error);
        },
      });
  }
  ngAfterViewInit() {
    // const el = this.cardContainer.nativeElement
    // el.addEventListener('wheel', (event:WheelEvent) =>{
    //   event.preventDefault();
    //   el.scrollLeft += event.deltaY;
    // })
    // if (this.tasks.length > 0) {
    // el.style.setProperty('padding', '10px', 'important');
    // }
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('page load task')
    if (id) {
      this.http
        .get<any>(`https://taskshare-1d4b.onrender.com/task/getObjective/${id}`, {
          withCredentials: true,
        })
        .subscribe({
          next: (response) => {
            const formattedTasks = response.tasks
              .filter((task: any): task is ApiRes => task !== null && typeof task === 'object') // filter out nulls
              .map((task: any) => ({
                ...task,
                createdAtFormatted: task.createdAt ? this.formatDate(task.createdAt) : 'N/A',
                updatedAtFormatted: task.updatedAt ? this.formatDate(task.updatedAt) : 'N/A',
                completed: task.completed || false, // Initialize completed status
              }));
            console.log(response.members);
            this.tasks.push(...formattedTasks)
            this.http.post<any>(`https://taskshare-1d4b.onrender.com/auth/getusers`, response.members, { withCredentials: true, }).subscribe({
              next: (response) => {
                let upd = [];
                for (let i = 0; i < response.length; i++) {
                  upd.push(response[i].username);
                }
                this.members.push(...upd);
              },
              error: (err) => {
                console.log(err);
              }
            });

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
  addmember(Name: string) {
    if (Name === "") return;
    console.log('naam', Name)
    let k = this.route.snapshot.paramMap.get('id');
    let data = {
      username: Name,
      objectiveId: k
    };
    this.http.post<any>('https://taskshare-1d4b.onrender.com/task/addmember', data, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log(response);
        // this.ngOnInit();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
