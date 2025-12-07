import { inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../services/user'
import { CookieService } from 'ngx-cookie-service';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
 

interface ApiRes {
    username: string,
    token: string
  };
  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule,
      ReactiveFormsModule,
  ],
  providers: [CookieService],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  protected readonly form = new FormGroup({
    username:new FormControl(''),
    password:new FormControl('')
  })
  cookieService = inject(CookieService);
  constructor(private http: HttpClient, private userservice: User, private router: Router) {

  }
  onSubmit() {
    const payload = {
      username: this.form.value.username?.trim(),
      password: this.form.value.password
    };
    console.log('Login payload:', payload);
    this.http.post<ApiRes>('https://taskshare-1d4b.onrender.com/auth/login', payload, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.userservice.setToken(response.token);
          console.log(this.userservice.getToken());
          this.cookieService.set('token', response.token);
          this.userservice.setname(response.username);
          this.router.navigate(['all']);
        },
        error: (error) => {
          console.error('API Error:', error);
          const errorMessage = error.error?.message || error.message || 'Login failed. Please check your credentials.';
          alert(errorMessage);
        }
      });
  }
}