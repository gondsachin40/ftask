import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone:true,
  selector: 'app-home',
  imports: [RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  objectives : any = []
  constructor(private http: HttpClient,private router:Router) {

  }
  ngOnInit (){
    this.http.get<any>('https://taskshare-1d4b.onrender.com/task/all', { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('API response:', response);
        let curr = response.objectives;
        for (let x of curr) {
          this.objectives.push({
            title: x.title,
            id: x._id
          });
        }
        console.log(this.objectives)
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }
}
