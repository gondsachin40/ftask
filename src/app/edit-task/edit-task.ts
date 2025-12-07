import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface EditTaskApiRes {
  message: string;
  task: {
    _id: string;
    taskTitle: string;
    taskDescription: string;
    links: string[];
    tasksId: string; // Assuming this is the objective ID
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

@Component({
  standalone: true,
  selector: 'edit-task',
  imports: [
    JsonPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-task.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTask implements OnInit {
  sach: string = "hello";
  taskId: string | null = null;
  payload: any = {};
  constructor(private router: Router, private http: HttpClient) { }
  protected readonly links = [...''];
  protected readonly form = new FormGroup({
    taskTitle: new FormControl<string>('', Validators.required),
    taskDescription: new FormControl<string>('', Validators.required),
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

  ngOnInit() {
    this.taskId = this.router.url.split('/')[2];
    this.http
      .get<any>(`https://taskshare-1d4b.onrender.com/task/getTask/${this.taskId}`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          // this.form.value.taskTitle = res.task.taskTitle;
          // this.form.value.taskDescription = res.task.taskDescription;
          // this.form.value.links = res.task.links;
          // this.form.setValue({})
          this.form.patchValue({
            taskTitle: res.task.taskTitle,
            taskDescription: res.task.taskDescription,
            links: res.task.links
          })
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.http.post<EditTaskApiRes>(`https://taskshare-1d4b.onrender.com/task/editTask/${this.taskId}`, this.form.value, { withCredentials: true })
        .subscribe({
          next: (response) => {
            console.log('API Response:', response);
            // Assuming `tasksId` is the objective ID and is available in the response or current task context.
            // If not, you might need to fetch it or pass it through the route.
            this.router.navigate(['/task', response.task.tasksId]);
          },
          error: (error) => {
            console.error('API Error:', error);
            alert('Failed to update task.');
          }
        });
    }
  }
}
