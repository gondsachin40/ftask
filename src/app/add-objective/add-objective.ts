import {AsyncPipe, NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormGroup, Validators, FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { take } from 'rxjs';
import { User } from '../../services/user';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
    standalone: true,
    selector:'add-objective',
    imports: [
    JsonPipe,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    FormsModule
],
    templateUrl: './add-objective.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './add-objective.css',
})
export class AddObjective {
    cookieService = inject(CookieService)
    constructor (private http:HttpClient,private userservice:User,private router:Router){

    }
    
    protected readonly form = new FormGroup({
        title:new FormControl('')
    });
    onSubmit(){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.userservice.getToken()}`
        });

    const body = {
    title: this.form.value.title
    }
    this.http.post('https://taskshare-1d4b.onrender.com/task/create', body,{withCredentials:true})
      .subscribe({
        next: (response) => {
            console.log('API Response:', response);
            this.router.navigate(['/all']);
        },
        error: (error) => {
          console.error('API Error:', error);
        }
    });
      console.log('Task created successfully');
    }
}