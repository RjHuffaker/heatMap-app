import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CallScriptService } from '@/_services';
import { CallScript } from '@/_models';

@Component({
  selector: 'app-call-script-edit',
  templateUrl: './call-script-edit.component.html',
  styleUrls: ['./call-script-edit.component.scss']
})
export class CallScriptEditComponent implements OnInit {

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

  saveCallScript(callScript: CallScript){
    this.currentCallScript.content = this.currentPrompt;
    this.callScriptService.update(this.currentCallScript).subscribe( res => {
      this.goBack();
    });
  }

  deleteCallScript(){
    if(confirm("Delete "+this.currentCallScript.title+"?")){
      this.callScriptService.delete(this.currentCallScript.id).subscribe( res => {
        this.goBack();
      });
    }
  }

  addChild(){
    var newChild = {
      reply: "",
      prompt: "",
      children: []
    };
    this.currentPrompt.children.push(newChild);
  }


  selectChild(child){
    this.parents.push(this.currentPrompt);
    this.currentPrompt = child;
  }

  goBackPrompt(){
    this.currentPrompt = this.parents.pop();
  }

}
