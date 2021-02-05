import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {

  constructor(
  	private router: Router,
		private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

		const currentUser = this.authenticationService.currentUserValue;
		
		if(currentUser) {
			// authorised so return true
			if(currentUser.role === "ADMIN"){
				return true;
			}
			
			this.router.navigate(['/user/profile'], { queryParams: { returnUrl: state.url }});

		}

		this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
    
    return false;

	}

}
