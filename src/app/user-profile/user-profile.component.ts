import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthenticationService, MessageService, TechMarkerService, UserService } from '@/_services';
import { User } from '@/_models';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUserSubscription: Subscription;

  currentUser;

  techList;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private techMarkerService: TechMarkerService,
    private userService: UserService
  ){
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(){
    this.techMarkerService.getTechList().subscribe( techList => this.techList = techList );
  }

  resetPassword(){
    let oldPass = prompt('Old Password:');
    if(oldPass){
      let newPass = prompt('New Password:');
      if(newPass){
        this.userService.resetPassword(this.currentUser, oldPass, newPass).pipe(first()).subscribe( res => {
          if(res){
            alert('Password Reset Successful');
          } else {
            alert('Password Reset Failed');
          }
        })
      }
    }
  }
  
  logout(){
    this.authenticationService.logout();
    this.router.navigate(["/user/login"]);
  }

  getToolTip(item, itemList){
    let toolTip = item;

    for(var i = 0; i < itemList.length; i++){
      let _item = itemList[i];
      if(_item.name===item){
        if(_item.description){
          toolTip = _item.description;
        }
      }
    }

    return toolTip;
  }
  
}
