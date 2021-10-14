import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { AuthenticationService, TechMarkerService, UserService } from '@/_services';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @ViewChild('userEditModal', { static: true }) userEditModal: TemplateRef<any>;

  @Input() currentUser;

  techList;

  roles = ['TECH', 'CSR', 'SUPERVISOR', 'ADMIN'];

  authUser;

  authUserSubscription: Subscription;
  
  modalData = {
    mode: "",
    userList: [],
    itemList: [],
    userIndex: -1
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: NgbModal,
    public authenticationService: AuthenticationService,
    public techMarkerService: TechMarkerService,
    public userService: UserService
  ){

    this.authUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.authUser = user;
    });

  }

  ngOnInit(){
    this.techMarkerService.getTechList().subscribe( techList => this.techList = techList );

    this.readUser();
  }

  goBack(){
    this.router.navigate(["user/browse"]);
  }

  readUser(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getById(id)
      .subscribe(user => {
        this.currentUser = user;

        if(!this.currentUser.techList){
          this.currentUser.techList = [];
        }

      });
  }

  saveUser(){
    this.userService.update(this.currentUser).pipe(first()).subscribe( res => {
      if(this.currentUser.id === this.authUser.id){
        Object.keys(this.currentUser).forEach(key => {
          this.authUser[key] = this.currentUser[key];
        });
      }
      this.goBack();
    });
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

  deleteUser(){
    if(confirm("Delete "+this.currentUser.username+"?")){
      if(confirm("Really? Just think of all the good times...")){
        this.userService.delete(this.currentUser.id).subscribe( res => {
          this.goBack();
        });
      }
    }
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

  toggleModal(mode, index?){
    this.modalData.mode = mode;
    this.modalData.userIndex = index;

    if(mode==="techManager"){
      this.modalData.userList = this.currentUser.techList.slice();
      this.modalData.itemList = this.techList.slice();
    }

    this.modal.open(this.userEditModal, { size: 'lg' });
  }


  confirmModal(){
    if(this.modalData.mode === "techManager"){
      this.currentUser.techList = this.modalData.userList.slice();
    }
    console.log(this.currentUser);
  }

  // MODAL LIST MANAGER

  selectItem(index){
    this.modalData.userIndex = index;
  }

  assignItem(index){
    this.modalData.userList.push(this.modalData.itemList[index].name);
  }

  unassignItem(index){
    this.modalData.userList.splice(index, 1);
    this.modalData.userIndex = -1;
  }

  moveItemUp(){
    if(this.modalData.userIndex > 0){
      this.modalData.userList.splice(this.modalData.userIndex-1, 0,
        this.modalData.userList.splice(this.modalData.userIndex, 1)[0]);
      this.modalData.userIndex--;
    }
  }

  moveItemDown(){
    if(this.modalData.userIndex < this.modalData.userList.length-1){
      this.modalData.userList.splice(this.modalData.userIndex+1, 0,
        this.modalData.userList.splice(this.modalData.userIndex, 1)[0]);
      this.modalData.userIndex++;
    }
  }

  getUserIndex(itemName){
    let userIndex = -1;
    for(var i = 0; i < this.modalData.userList.length; i++){
      if(this.modalData.userList[i] === itemName){
        userIndex = i;
      }
    }
    return userIndex;
  }


}
