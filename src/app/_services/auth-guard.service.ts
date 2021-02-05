import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

		const currentUser = this.authenticationService.currentUserValue;
		
		if(currentUser) {
			// authorised so return true
			return true;
		}

		this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url }});
    
    return false;

	}

}
