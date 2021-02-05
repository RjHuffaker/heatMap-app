import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { AuthenticationService, TaskService, UserService } from '@/_services';

@Component({
  selector: 'app-task-log',
  templateUrl: './task-log.component.html',
  styleUrls: ['./task-log.component.scss']
})
export class TaskLogComponent implements OnInit {

  @ViewChild('taskEditModal', { static: true }) taskEditModal: TemplateRef<any>;

  taskList;

  userList;

  currentUser;

  selectId;

	authUser;

  authUserSubscription: Subscription;

  currentDate = moment();

  days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

  week = [];

  startOfWeek;

  endOfWeek;

  taskEditor = false;

  modalData = {
    taskIsNew: null,
    task: {}
  };

  currentTask = {
    id: null,
    name: "",
    description: ""
  };

  taskIsNew;

  constructor(
    private modal: NgbModal,
  	public authenticationService: AuthenticationService,
    public taskService: TaskService,
    public userService: UserService
  ){
  	this.authUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.authUser = user;
    });
  }

  ngOnInit(){
    this.browseTasks();

    this.userService.getAll().subscribe( userList => {
      this.userList = userList.sort(this.userService.alphabetize);
      userList.forEach((user) => {
        if(this.authUser.id === user.id){
          this.selectUser(user);
        }
      });
    });
  }

  selectUser(user){
    this.taskEditor = false;

  	this.currentUser = user;

    this.selectId = this.currentUser.id;

  	this.setWeek(this.currentDate);
  }

  setWeek(date){
  	
  	this.startOfWeek = moment(date).startOf('isoWeek');
		this.endOfWeek = moment(date).endOf('isoWeek');
		this.week.length = 0;

		let day = this.startOfWeek;

		while(day <= this.endOfWeek){
		    this.week.push(day.format("MMDDYY"));
		    day = day.clone().add(1, 'd');
		}
  }

  prevWeek(){
  	this.currentDate.subtract(1, 'week');
  	this.setWeek(this.currentDate);
  }

  nextWeek(){
  	this.currentDate.add(1, 'week');
  	this.setWeek(this.currentDate);
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

  toggleTask(task, date){
    if(!this.currentUser.taskLog[task]){
      this.currentUser.taskLog[task] = {};
    }
  	if(this.currentUser.taskLog[task][date]){
  		if(this.currentUser.taskLog[task][date] === this.authUser.username){
  			delete this.currentUser.taskLog[task][date];
  		} else {
  			alert("Unable to complete this action. Tasks can be unsigned only by the original signee.");
  		}
  	} else {
  		this.currentUser.taskLog[task][date] = this.authUser.username;
  	}
  	this.userService.update(this.currentUser).pipe(first()).subscribe( res => {
  		console.log("User Updated");
  	});
  }

  toggleModal(modalData){
    this.modalData = modalData;
    this.modal.open(this.taskEditModal, { size: 'lg' });
  }

  openTaskEditor(){
    this.taskEditor = true;
    this.selectId = -1;
    this.currentUser = null;
  }

  browseTasks(){
    this.taskService.getAll().subscribe( taskList => {
      this.taskList = taskList.sort(this.taskService.alphabetize);
    });
  }

  readTask(task){
    if(this.currentTask === task){
      this.toggleModal({
        taskIsNew: false,
        task: task
      });
    } else if(this.currentTask !== task){
      this.currentTask = task;
    }
  }

  editTask(task){
    this.taskService.update(task).subscribe( task => {
      console.log(task);
      this.browseTasks();
    });
  }

  addTask(task?){
    if(task){
      this.taskService.create(task).subscribe( task => {
        this.browseTasks();
      });
    } else {
      this.toggleModal({
        taskIsNew: true,
        task: {
          id: null,
          name: "",
          description: ""
        }
      });
    }
  }

  deleteTask(task){
    if(confirm("Delete "+task.name+"?")){
      this.taskService.delete(task.id).subscribe( task => {
        console.log(task);
        this.browseTasks();
      });
    }
  }

}
