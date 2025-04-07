import { Component } from '@angular/core';
import {WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience }from '../models/work-experience/work-experience.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrl: './admin-workexperience.component.css'
})
export class AdminWorkexperienceComponent {
  itemCount: number = 0; 
  btnTxt: string = "Agregar";
  goalText: string = "";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();

  constructor(public workExperienceService: WorkExperienceService)
	{
		console.log(this.workExperienceService);
		this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
		  map(changes =>
		    changes.map( c =>
		      ({ id: c.payload.doc.id, ...c.payload.doc.data() })
		    )
		  )
		).subscribe(data => {
		  this.workExperience = data;
		  console.log(this.workExperience);
		});
	}

  AgregarJob(){
    console.log(this.workExperienceService);
    this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
       console.log('Created new item successfully!');
    });
  }

  deleteJob(id? :string){
    this.workExperienceService.deleteWorkExperience(id).then(() => {
       console.log('Delete item successfully!');
    });
    console.log(id);
  }
  updateJob(id? :string){
    alert('updating...');
  }

}
