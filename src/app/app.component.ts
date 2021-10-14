import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pest Control App';

  showNavigata(){
    if(window.location.href === "http://localhost:4200/"){
      return false;
    } else if(window.location.href === "http://azpestcontrol.services/"){
      return false;
    } else if(window.location.href === "https://azpestcontrol.services/"){
      return false;
    } else {
      return true;
    }
  }

  constructor(){}

}
