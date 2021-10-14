import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CallScriptService, AuthenticationService } from '@/_services';
import { CallScript } from '@/_models';

@Component({
  selector: 'app-call-script-browse',
  templateUrl: './call-script-browse.component.html',
  styleUrls: ['./call-script-browse.component.scss']
})
export class CallScriptBrowseComponent implements OnInit {

  currentUser;

  currentUserSubscription: Subscription;

  selectedRowId;

  callScriptList: CallScript[];

  constructor(
    private router: Router,
    public callScriptService: CallScriptService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.browseCallScripts();
  }

  browseCallScripts(){
    this.callScriptService.getAll().subscribe( callScript => this.callScriptList = callScript );
  }

  readCallScript(callScriptId){
    this.router.navigate([`callScript/read/${callScriptId}`]);
  }

  editCallScript(callScriptId){
    this.router.navigate([`callScript/edit/${callScriptId}`]);
  }

  addCallScript(){
    this.router.navigate(['callScript/add']);
  }

  selectRow(callScriptId){
    if(this.selectedRowId !== callScriptId){
      this.selectedRowId = callScriptId;
    } else {
      this.readCallScript(callScriptId);
    }
  }

}
