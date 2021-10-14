import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { CallScriptService } from '@/_services';
import { CallScript } from '@/_models';

@Component({
  selector: 'app-call-script-add',
  templateUrl: './call-script-add.component.html',
  styleUrls: ['./call-script-add.component.scss']
})
export class CallScriptAddComponent implements OnInit {

  newCallScript = {
    id: null,
    author: "",
    title: "",
    category: "",
    content: {
      prompt: "",
      children: [
        
      ]
    }
  };
  
  callScriptContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  	public callScriptService: CallScriptService
  ){}

  ngOnInit() {
  }

  addCallScript(callScript: CallScript){
    this.callScriptService.create(this.newCallScript).subscribe( res => this.goBack() );
  }

  goBack(){
    this.router.navigate(["callScript/browse"]);
  }

}
