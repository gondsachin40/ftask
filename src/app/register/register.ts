import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../services/user'
import { CookieService } from 'ngx-cookie-service';
import { TuiTextfieldComponent } from "@taiga-ui/core";
import {AsyncPipe, NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,
      TuiTextfield,
       AsyncPipe,
        ReactiveFormsModule,
        TuiAppearance,
        TuiButton,
        TuiCardLarge,
        TuiError,
        TuiFieldErrorPipe,
        TuiForm,
        TuiHeader,
        TuiNotification,
        TuiSegmented,
        TuiSwitch,
        TuiTextfield,
        TuiTitle,
        TuiTooltip
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  protected readonly form = new FormGroup({
      username:new FormControl(''),
      password:new FormControl('')
  })
  constructor(private http: HttpClient, private userservice: User, private router: Router) {

  }
  goToRegister() {

  }
  onSubmit() {
    const payload = {
      username: this.form.value.username,
      password: this.form.value.password
    };
    console.log(payload)
    this.http.post<any>('http://localhost:3000/auth/register', payload)
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('API Error:', error);
        }
      });
  }
}
