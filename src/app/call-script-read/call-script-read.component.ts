import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CallScriptService } from '@/_services';
import { CallScript } from '@/_models';

@Component({
  selector: 'app-call-script-read',
  templateUrl: './call-script-read.component.html',
  styleUrls: ['./call-script-read.component.scss']
})
export class CallScriptReadComponent implements OnInit {

  currentCallScript;

  currentPrompt;

  parents = [];

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
  	public callScriptService: CallScriptService
  ){}

  ngOnInit() {
    this.readCallScript();
  }

  readCallScript(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.callScriptService.getById(id)
      .subscribe(callScript => {
        this.currentCallScript = callScript;
        this.currentPrompt = JSON.parse(this.currentCallScript.content);
      });
  }

  goBack(){
  	this.router.navigate(["callScript/browse"]);
  }

  selectChild(child){
    this.parents.push(this.currentPrompt);
    this.currentPrompt = child;
  }

  goBackPrompt(){
    this.currentPrompt = this.parents.pop();
  }

}
