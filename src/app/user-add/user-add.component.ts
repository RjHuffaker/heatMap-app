import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

import { TechMarkerService, UserService } from '@/_services';
import { User } from '../_models/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  
  @ViewChild('userEditModal', { static: true }) userEditModal: TemplateRef<any>;

  techList;

  roles = ['TECH', 'CSR', 'SUPERVISOR', 'ADMIN'];

  currentUser = {
    username: "",
    password: "",
    role: "TECH",
    preferences: {},
    techList: []
  };

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
    public techMarkerService: TechMarkerService,
    public userService: UserService
 	){

  }

  ngOnInit(){
    this.techMarkerService.getTechList().subscribe( techList => this.techList = techList );
  }

  addUser(){
    let user = {
      username: this.currentUser.username,
      password: this.currentUser.password,
      role: this.currentUser.role,
      preferences: this.currentUser.preferences
    };

    this.userService.register(user).subscribe( res => {
      this.goBack();
    });
  }

  goBack(){
  	this.router.navigate(["user/browse"]);
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






  toggleTech(techName){
    if(this.currentUser.techList.length){
      var techIndex = this.currentUser.techList.indexOf(techName)
      if(techIndex > -1){
        this.currentUser.techList.splice(techIndex,1);
      } else {
        this.currentUser.techList.push(techName);
      }
    } else {
      this.currentUser.techList.push(techName);
    }
  }

}
