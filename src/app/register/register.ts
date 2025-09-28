import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../services/user'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  username: string = '';
  password: string = '';
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
