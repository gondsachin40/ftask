import { TuiRoot } from "@taiga-ui/core";
import { inject } from "@angular/core";
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import { AddTask } from "./add-task/add-task";
import { AddObjective } from "./add-objective/add-objective";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRoot, Navbar,AddTask,AddObjective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ftask');
}
