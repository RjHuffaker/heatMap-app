import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pest Control App';

  showNavigata = true;

  cityList = ["phoenix","tucson","mesa","chandler","gilbert","scottsdale"];

  constructor(){
  	this.cityList.forEach(city=>{
  		if(window.location.href.includes(city)){
  			this.showNavigata = false;
  		}
  	});

  }

}
