import {AsyncPipe, NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormGroup, Validators, FormsModule } from '@angular/forms';
import {TuiDay,TuiBooleanHandler} from '@taiga-ui/cdk'
import { JsonPipe } from '@angular/common';
import { take } from 'rxjs';
import { User } from '../../services/user';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {
    TuiAppearance,
    TuiButton,
    TuiError,
    TuiIcon,
    TuiNotification,
    TuiTextfield,
    TuiTitle,
} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiSegmented, TuiSwitch, TuiTooltip} from '@taiga-ui/kit';
import {TuiCardLarge, TuiForm, TuiHeader} from '@taiga-ui/layout';
import {TuiInputChip} from '@taiga-ui/kit';
 
import{
  TuiInputDateModule,
  TuiTextfieldControllerModule,
  TuiUnfinishedValidator,
}from '@taiga-ui/legacy'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
    standalone: true,
    selector:'add-objective',
    imports: [
    JsonPipe,
    TuiInputChip,
    AsyncPipe,
    NgIf,
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
    AsyncPipe,
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
    this.http.post('http://localhost:3000/task/create', body,{withCredentials:true})
      .subscribe({
        next: (response) => {
            console.log('API Response:', response);
        },
        error: (error) => {
          console.error('API Error:', error);
        }
      });
      console.log('Task created successfully');
    }
}