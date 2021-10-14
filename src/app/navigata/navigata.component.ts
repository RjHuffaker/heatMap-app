import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthenticationService } from '@/_services';

@Component({
  selector: 'app-navigata',
  templateUrl: './navigata.component.html',
  styleUrls: ['./navigata.component.scss']
})
export class NavigataComponent {

  @Input()
  routerLinkActiveOptions: {
      exact: boolean;
  }

  authUser;

  authUserSubscription: Subscription;

  listExpanded;

  constructor(
  	public router: Router,
    private authenticationService: AuthenticationService
  ){
    this.authUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.authUser = user;
    });
  }
	
  showHideList(){
    this.listExpanded = !this.listExpanded;
  }

  securityClearance(role){
    if(!this.authUser) return false;
    let roles = ['TECH', 'CSR', 'SUPERVISOR', 'ADMIN'];
    return roles.indexOf(role) <= roles.indexOf(this.authUser.role);
  }

  isHeatMap(){
    return window.location.href === "http://localhost:4200/";
  }

}
