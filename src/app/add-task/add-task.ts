import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
    standalone: true,
    selector: 'add-task'
    ,
    imports: [
        JsonPipe,
        AsyncPipe,
        NgIf,
        ReactiveFormsModule,

    ],
    templateUrl: './add-task.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTask {
    constructor(private router: Router, private http: HttpClient) { }
    protected readonly links = [...'']
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

    onSubmit() {
        let id = this.router.url.split('/')[2];
        if (this.form.valid) {
            console.log(this.form.value);
        }
        console.log("submitted")
        let payload = {
            taskTitle: this.form.value.taskTitle,
            taskDescription: this.form.value.taskDescription,
            links: this.form.value.links,
            tasksId: id
        }
        this.http.post<any>('https://taskshare-1d4b.onrender.com/task/addtask', payload, { withCredentials: true }).subscribe({
            next: (res) => {
                console.log(res);
            },
            error: (err) => {
                console.log(err);
            }
        })

    }

}
