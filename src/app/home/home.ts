import { Component } from '@angular/core';
import { TuiLink } from '@taiga-ui/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TuiFloatingContainer} from '@taiga-ui/kit';
import { TuiButton } from '@taiga-ui/core';
@Component({
  standalone:true,
  selector: 'app-home',
  imports: [RouterLink,
    TuiFloatingContainer,
    TuiButton
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  objectives : any = []
  constructor(private http: HttpClient,private router:Router) {

  }
  ngOnInit (){
    this.http.get<any>('http://localhost:3000/task/all', { withCredentials: true }).subscribe({
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
