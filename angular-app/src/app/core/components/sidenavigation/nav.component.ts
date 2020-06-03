import {Component, Input, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {MatSidenav} from '@angular/material/sidenav';

interface ROUTE {
  icon?: string;
  route?: string;
  title?: string;
}


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  myWorkRoutes: ROUTE[] = [
    {
      icon: 'assignment',
      route: '',
      title: 'Activities',
    }, {
      icon: 'dashboard',
      route: '',
      title: 'Dashboards',
    }
  ];

  customerRoutes: ROUTE[] = [
   {
      icon: 'people',
      route: '',
      title: 'Contacts',
    }
  ];

  moreRoutes: ROUTE[] = [
    {
      icon: 'call_made',
      route: '',
      title: 'Kommende Features',
    }, {
      icon: 'call_made',
      route: '',
      title: 'Unsere Mission',
    }, {
      icon: 'call_made',
      route: 'impressum',
      title: 'Impressum',
    }
  ];

  @ViewChild('drawer') public drawer: MatSidenav
  screenWidth: number

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {

    // set screenWidth on page load
    this.screenWidth = window.innerWidth
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth
    }
  }

}
