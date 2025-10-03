import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    standalone: true,
    selector: 'add-objective'
    ,
    imports: [ReactiveFormsModule],
    templateUrl: './add-objective.html',
    styleUrl: './add-objective.css',
})
export class AddObjective {
    constructor(private http: HttpClient, private route: Router) {

    }
    title = new FormControl();
    onSubmit(): void {
        let payload = {
            title: this.title.value,
        }
        if (this.title.value === "") return;
        console.log(payload);
        this.http.post<any>('http://localhost:3000/task/create', payload, { withCredentials: true }).subscribe({
            next: (res) => {
                console.log(res);
                console.log(res._id);
                this.route.navigate([`addtask/${res._id}`]);
            },
            error: (res) => {
                console.log(res);
            }
        })


    }
}