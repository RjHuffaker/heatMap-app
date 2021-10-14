import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prompt-edit',
  templateUrl: './prompt-edit.component.html',
  styleUrls: ['./prompt-edit.component.scss']
})
export class PromptEditComponent implements OnInit {

  @Input() prompt;

  currentPrompt;

  parents = [];

  constructor() { }

  ngOnInit() {
    this.currentPrompt = this.prompt;
  }
  
  selectChild(child){
  	this.parents.push(this.currentPrompt);
    this.currentPrompt = child;
  }

  addChild(){
    var newChild = {
      reply: "",
      prompt: "",
      children: []
    };
    this.currentPrompt.children.push(newChild);
  }

  deleteChild(child){
    if(confirm("Delete '"+this.currentPrompt.children[child].reply+"'?"))
    this.currentPrompt.children.splice(child, 1);
  }

  goBack(){
    this.currentPrompt = this.parents.pop();
  }

}
