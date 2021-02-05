import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@/_services';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-browse',
  templateUrl: './user-browse.component.html',
  styleUrls: ['./user-browse.component.scss']
})
export class UserBrowseComponent implements OnInit {

  selectedRowId;

  userList;

  constructor(
    private router: Router,
  	public userService: UserService
  ) {
  }

  ngOnInit() {
  	this.browseUsers();
  }

  browseUsers(){
    this.userService.getAll().subscribe( userList => {
      this.userList = userList.sort(this.userService.alphabetize);
    });
  }

  editUser(userId){
    this.router.navigate([`user/edit/${userId}`]);
  }

  addUser(){
    this.router.navigate(['user/add']);
  }

  selectRow(userId){
  	if(this.selectedRowId !== userId){
      this.selectedRowId = userId;
    } else {
      this.editUser(userId);
    }
  }

}
