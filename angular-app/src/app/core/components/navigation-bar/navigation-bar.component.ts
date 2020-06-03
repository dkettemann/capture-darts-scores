import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavComponent} from '../sidenavigation/nav.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  APP_TOOLBAR_TITLE = "Magic Darts"

  constructor(public navComponent: NavComponent) {

  }

  ngOnInit() {
  }

  logout(){
    console.log("logout")
  }

}
