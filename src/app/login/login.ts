import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../services/user'
import { CookieService } from 'ngx-cookie-service';
interface ApiRes {
  username: string,
  token: string
};
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers: [CookieService],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';
  password: string = '';
  cookieService = inject(CookieService);
  constructor(private http: HttpClient, private userservice: User, private router: Router) {

  }
  goToRegister() {

  }
  onSubmit() {
    const payload = {
      username: this.username,
      password: this.password
    };
    console.log(payload)
    this.http.post<ApiRes>('http://localhost:3000/auth/login', payload)
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
        }
      });
  }
}