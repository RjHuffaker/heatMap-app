import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prompt-read',
  templateUrl: './prompt-read.component.html',
  styleUrls: ['./prompt-read.component.scss']
})
export class PromptReadComponent implements OnInit {

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

  goBack(){
    this.currentPrompt = this.parents.pop();
  }

}
