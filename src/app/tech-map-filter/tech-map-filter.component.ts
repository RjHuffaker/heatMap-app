import { Component, OnInit, Input } from '@angular/core';

import { TechMarkerService } from '../_services/tech-marker.service';
import { SetupDataService } from '../_services/setup-data.service';

@Component({
  selector: 'app-tech-map-filter',
  templateUrl: './tech-map-filter.component.html',
  styleUrls: ['./tech-map-filter.component.css']
})

export class TechMapFilterComponent implements OnInit {
	@Input() filterName;
	
	@Input() filterData;

	@Input() itemsPerRow;

	objectKeys = Object.keys;

  constructor(
  	public techMarkerService: TechMarkerService,
		public setupDataService: SetupDataService
  ){}

  ngOnInit(){
  	if(!this.techMarkerService.colorScale) this.techMarkerService.setFilterScale();
  	console.log(this.filterData);
  }

  selectAllToggle(event){
  	var checked = event.target.checked;
		for(var key in this.filterData){
			this.filterData[key].excluded = checked;
		}
		this.techMarkerService.updateMarkerList();
	}

	selectToggle(key){
		this.filterData[key].excluded = !this.filterData[key].excluded;

		this.techMarkerService.updateMarkerList();
	}

	getShadow(color){
		return "1px 1px 0 "+color;
	}

}
