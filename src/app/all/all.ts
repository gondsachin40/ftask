import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Addsign } from './addsign/addsign';
interface Ans {
  title: string,
  id: string,
}
@Component({
  selector: 'app-all',
  standalone: true,
  imports: [
    Addsign,

],
  templateUrl: './all.html',
  styleUrl: './all.css'
})
export class All {
  ans: Ans[] = [];
  constructor(private http: HttpClient, private router: Router) {

    this.http.get<any>('https://taskshare-1d4b.onrender.com/task/all', { withCredentials: true }).subscribe({
      next: (response) => {
        console.log('API response:', response);
        let curr = response.objectives;
        for (let x of curr) {
          this.ans.push({
            title: x.title,
            id: x._id
          });
        }
        console.log(this.ans)
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });
  }
  goToTask(s: string) {
    console.log(s);
    this.router.navigate([`/task/${s}`]);
  }
  goToObjective() {
    console.log("Objective");
    this.router.navigate(['/addObjective']);
  }
  addtask() {
    let id = this.router.url.split('/')[2];
    console.log(id);
    // this.router.navigate([`/addtask/${s}`]);
  }
}