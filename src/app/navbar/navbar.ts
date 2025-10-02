import { KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterEvent, RouterLink, RouterLinkActive, Event } from '@angular/router';
import { tuiAsPortal, TuiPortals, TuiRepeatTimes } from '@taiga-ui/cdk';
import { User } from '../../services/user';
import { Router, NavigationEnd } from '@angular/router';
import {
  TuiAppearance,
  TuiButton,
  TuiDataList,
  TuiDropdown,
  TuiDropdownService,
  TuiIcon,
  TuiLink,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import {
  TuiAvatar,
  TuiBadge,
  TuiBadgeNotification,
  TuiBreadcrumbs,
  TuiChevron,
  TuiDataListDropdownManager,
  TuiFade,
  TuiSwitch,
  TuiTabs,
} from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader, TuiNavigation } from '@taiga-ui/layout';
import { filter } from 'rxjs/internal/operators/filter';

const ICON =
  "data:image/svg+xml,%0A%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='32' height='32' rx='8' fill='url(%23paint0_linear_2036_35276)'/%3E%3Cmask id='mask0_2036_35276' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='6' y='5' width='20' height='21'%3E%3Cpath d='M18.2399 9.36607C21.1347 10.1198 24.1992 9.8808 26 7.4922C26 7.4922 21.5645 5 16.4267 5C11.2888 5 5.36726 8.69838 6.05472 16.6053C6.38707 20.4279 6.65839 23.7948 6.65839 23.7948C8.53323 22.1406 9.03427 19.4433 8.97983 16.9435C8.93228 14.7598 9.55448 12.1668 12.1847 10.4112C14.376 8.94865 16.4651 8.90397 18.2399 9.36607Z' fill='url(%23paint1_linear_2036_35276)'/%3E%3Cpath d='M11.3171 20.2647C9.8683 17.1579 10.7756 11.0789 16.4267 11.0789C20.4829 11.0789 23.1891 12.8651 22.9447 18.9072C22.9177 19.575 22.9904 20.2455 23.2203 20.873C23.7584 22.3414 24.7159 24.8946 24.7159 24.8946C23.6673 24.5452 22.8325 23.7408 22.4445 22.7058L21.4002 19.921L21.2662 19.3848C21.0202 18.4008 20.136 17.7104 19.1217 17.7104H17.5319L17.6659 18.2466C17.9119 19.2306 18.7961 19.921 19.8104 19.921L22.0258 26H10.4754C10.7774 24.7006 12.0788 23.2368 11.3171 20.2647Z' fill='url(%23paint2_linear_2036_35276)'/%3E%3C/mask%3E%3Cg mask='url(%23mask0_2036_35276)'%3E%3Crect x='4' y='4' width='24' height='24' fill='white'/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_2036_35276' x1='0' y1='0' x2='32' y2='32' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23A681D4'/%3E%3Cstop offset='1' stop-color='%237D31D4'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_2036_35276' x1='6.0545' y1='24.3421' x2='28.8119' y2='3.82775' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.0001' stop-opacity='0.996458'/%3E%3Cstop offset='0.317708'/%3E%3Cstop offset='1' stop-opacity='0.32'/%3E%3C/linearGradient%3E%3ClinearGradient id='paint2_linear_2036_35276' x1='6.0545' y1='24.3421' x2='28.8119' y2='3.82775' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0.0001' stop-opacity='0.996458'/%3E%3Cstop offset='0.317708'/%3E%3Cstop offset='1' stop-opacity='0.32'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E%0A";

@Component({
  selector: 'app-navbar',
  imports: [
    FormsModule,
    RouterLink,
    TuiAppearance,
    TuiAvatar,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiNavigation,
    TuiTabs,
    TuiTextfield,

  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDropdownService, tuiAsPortal(TuiDropdownService)],
})
export class Navbar extends TuiPortals implements OnInit {
  login: boolean = false;
  isAllPage = false;
  isTaskPage = false;
  isAllPageSig = signal(false);
  //how signal works:
  //to access signal value you have to call its function 
  //for example for accessing flag signal flag()
  //to set the value you can use set() or update() and update is recommended by angular
  //for doing calculation you have to use computed() it accepts a function and update also
  //for updating signal array we have to use update() array.update((values)=>[...values,"item"])
  //mutate is also a way but it is dropped in angualar 17
  url: string = "";
  username: string | undefined = "";
  protected expanded = signal(false);
  protected open = false;
  protected switch = false;
  protected readonly routes: any = {};
  protected readonly breadcrumbs = ['Home', 'Angular', 'Repositories', 'Taiga UI'];

  protected readonly drawer = {
    Components: [
      { name: 'Button', icon: ICON },
      { name: 'Input', icon: ICON },
      { name: 'Tooltip', icon: ICON },
    ],
    Essentials: [
      { name: 'Getting started', icon: ICON },
      { name: 'Showcase', icon: ICON },
      { name: 'Typography', icon: ICON },
    ],
  };
  constructor(private service: User, private router: Router, private change: ChangeDetectorRef) {
    console.log('** construct **')
    super();
    this.login = this.service.isLoggedIn;
    console.log(this.login);
    console.log(this.router.url);
  }
  ngOnInit(): void {
    //ngOnInit is angular lifecycle
    //it is like constructor we put all the values with help of it
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.url = e.urlAfterRedirects;
        this.call();
      }
    })
  }
  call() {
    console.log(this.url);
    this.username = this.service.getname();
    console.log('name', this.service.getname());
    if (this.url === '/all') {
      // this.isAllPage = true;
      this.isAllPage = true
      this.isTaskPage = false;
    } else if (this.url === '/task') {
      this.isTaskPage = true;
      // this.isAllPage = false;
      this.isAllPage = false
    }
    this.change.detectChanges();
    console.log('isAllPage', this.isAllPage)
  }
}
