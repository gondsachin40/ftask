import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
interface Invitation {
  _id: string;
  title: string;
  createdby: {
    _id: string;
    username: string;
  };
}
@Component({
  selector: 'app-notification',
  standalone : true,
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.css'
})
export class Notification implements OnInit {
  invitations: Invitation[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData()
   
  }
  accept(id : string){
    let data = {
      objectiveId : id
    }
     this.http.post<any>('http://localhost:3000/task/accept', data , { withCredentials: true }).subscribe({
      next: (response) => {
        console.log(response);
        alert('request accepted');
        this.loadData();
      },
      error: (error) =>   {
        console.error(error);
      }
    });
  }

  reject(id : string){
    let data = {
      objectiveId : id
    }
     this.http.post<any>('http://localhost:3000/task/reject', data , { withCredentials: true }).subscribe({
      next: (response) => {
        console.log(response);
        alert('request rejected');
        this.loadData();
      },
      error: (error) =>   {
        console.error(error);
      }
    });
  }


  loadData() {
     this.http.get<Invitation[]>('http://localhost:3000/auth/getinvitations', { withCredentials: true }).subscribe({
      next: (response) => {
        this.invitations = response;
        console.log(this.invitations);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}

