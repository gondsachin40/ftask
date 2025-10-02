import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Register } from './register/register';
import { All } from './all/all';
import { Task } from './task/task';
import { AddObjective } from './add-objective/add-objective';
import { AddTask } from './add-task/add-task';
export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'all', component: All },
    { path: 'task/:id', component: Task },
    { path: 'addTask',component:AddTask},
    { path: 'addObjective',component:AddObjective}
];
