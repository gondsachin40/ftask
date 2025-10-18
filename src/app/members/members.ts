import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-members',
  imports: [],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class Members {
  members: any = [];
  membersArray: any = [];
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getMembers(id);
    console.log(this.membersArray);
  }
  getMembers(id: any) {
    this.http
      .get<any>(`http://localhost:3000/task/getMembers/${id}`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          let curr = response.members;
          for (let x of curr) {
            this.http
              .get<any>(`http://localhost:3000/task/getUser/${x}`, { withCredentials: true })
              .subscribe({
                next: (response) => {
                  this.membersArray.push(response.username)
                  console.log(response)
                },
                error: (error) => {
                  console.error('API Error:', error);
                  return 'User not found';
                },
              });
          }
          console.log(this.membersArray);
          console.log('API response', response);
        },
        error: (error) => {
          console.error('API Error:', error);
        },
      });
  }
}
