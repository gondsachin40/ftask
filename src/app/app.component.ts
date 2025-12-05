import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component ({
  selector: 'app-login',
  standalone:true,
  templateUrl:'./login/login.component.html',
  styleUrl:'./login/login.component.css'
})export class login{
  
}
@Component({
  selector:'sign-up',
  templateUrl:'./sign-up/sign-up.component.html',
  styleUrl:'./sign-up/sign-up.component.css'
})export class signUp{ }
@Component ({
  selector:'add-task',
  templateUrl:'./add-task/add-task.component.html',
  styleUrl:'./add-task/add-task.component.css'
})export class addTask{}
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,login,signUp,addTask],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Alfaiz';
}