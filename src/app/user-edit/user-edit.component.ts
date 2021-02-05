import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { AuthenticationService, TaskService, TechMarkerService, UserService } from '@/_services';
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

  taskList;

  roles = ['TECH', 'CSR', 'SUPERVISOR', 'ADMIN'];

  timeCardCsv;

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
    public taskService: TaskService,
    public techMarkerService: TechMarkerService,
    public userService: UserService
  ){

    this.authUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.authUser = user;
    });

  }

  ngOnInit(){
    this.techMarkerService.getTechList().subscribe( techList => this.techList = techList );

    this.taskService.getAll().subscribe( taskList => this.taskList = taskList );

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

        if(!this.currentUser.taskList){
          this.currentUser.taskList = {};
        }

        if(!this.currentUser.timeCard){
          this.currentUser.timeCard = {};
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

  //TIMECARD UPLOADING

  uploadTimeCard(){

    let rows = this.timeCardCsv.split("\n");

    let month;
    let year;
    let date;

    rows.forEach((line) => {
      let cols = line.split(",");
      
      if(isNaN(cols[0])){
        if(cols[0]==="VACATION"){

          if(cols[4]>1){
            let dateRange = date.format('YYMM')+"01-15";
            let vacationPunch = [
              60*cols[4],
              this.currentUser.username,
              moment().format('YYYY-MM-DD, h:mm a')
            ];
            this.currentUser.timeCard[dateRange] = vacationPunch;
          }
          if(cols[9]>1){
            let dateRange = date.format('YYMM')+"16-"+date.endOf('month').format('DD');
            let vacationPunch = [
              60*cols[9],
              this.currentUser.username,
              moment().format('YYYY-MM-DD, h:mm a')
            ];
            this.currentUser.timeCard[dateRange] = vacationPunch;
          }

        } else if(["DAY","WEEK 1","WEEK 2", "Reg/Overtime", "TOTAL", "REG/OVRTM"].indexOf(cols[0])<0){
          let _month = cols[0].substring(0,3);
          let _year = cols[0].substring(3,7);
          if(_year && _month && !isNaN(_year)){
            month = _month;
            year = _year.substring(2,4);
          }
        }
        
      } else {
        date = moment(year+month+cols[0], 'YYMMMDD');
        let timePunch = this.createTimepunch(cols[1],cols[2],cols[3],cols[4]);
        if(timePunch){
          this.currentUser.timeCard[date.format('YYMMDD')] = timePunch;
        }
      }

      if(cols[5] && !isNaN(cols[5])){
        let date = moment(year+month+cols[5], 'YYMMMDD').format('YYMMDD');
        let timePunch = this.createTimepunch(cols[6],cols[7],cols[8],cols[9]);
        if(timePunch){
          this.currentUser.timeCard[date] = timePunch;
        }
      }
      
    });

    alert("Uploaded Successful: "+Object.keys(this.currentUser.timeCard).length+" entries added");

    console.log(this.currentUser.timeCard);
    
  }

  createTimepunch(col1, col2, col3, col4){
    if(isNaN(col4)){
      if(col4 && col4 !== 'SAT' && col4 !== 'SUN' && col4 !== '---'){
        return [
          0,0,0,0,col4,
          this.authUser.username,
          moment().format('YYYY-MM-DD, h:mm a')
        ];
      }
    } else {
      if(col1>0 || col2>0 || col3>0 || col4>0){
        return [
          col1*60, col2*60, col3*60, col4*60,"",
          this.authUser.username,
          moment().format('YYYY-MM-DD, h:mm a')
        ];
      }
    }
  }

  toggleModal(mode, index?){
    this.modalData.mode = mode;
    this.modalData.userIndex = index;

    if(mode==="techManager"){
      this.modalData.userList = this.currentUser.techList.slice();
      this.modalData.itemList = this.techList.slice();
    } else if(mode==="taskManager"){
      this.modalData.userList = this.currentUser.taskList.slice();
      this.modalData.itemList = this.taskList.slice();
    }

    this.modal.open(this.userEditModal, { size: 'lg' });
  }


  confirmModal(){
    if(this.modalData.mode === "techManager"){
      this.currentUser.techList = this.modalData.userList.slice();
    } else if(this.modalData.mode === "taskManager"){
      this.currentUser.taskList = this.modalData.userList.slice();
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
