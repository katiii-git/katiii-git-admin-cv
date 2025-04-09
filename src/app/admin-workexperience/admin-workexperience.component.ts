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
  selectedWorkExperienceId: string | null = null;
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
     if (this.selectedWorkExperienceId) {
    
      this.workExperienceService.updateWorkExperience(this.selectedWorkExperienceId, this.myWorkExperience).then(() => {
        this.resetForm();
        console.log('Updated successfully!');
      });
    } else {
   
      this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
        this.resetForm();
        console.log('Created new work experience successfully!');
      });
    }

    /*console.log(this.workExperienceService);
    this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
       console.log('Created new item successfully!');
    });*/
  }

  deleteJob(id? :string){
    this.workExperienceService.deleteWorkExperience(id).then(() => {
       console.log('Delete item successfully!');
    });
    console.log(id);
  }
  updateJob(job:any){
    this.myWorkExperience = { startDate: job.startDate, endDate: job.endDate, location: job.location, position: job.position, company: job.company, accomplishment: job.accomplishment };
    this.selectedWorkExperienceId = job.id;
    this.btnTxt = 'Update';
  }

  resetForm() {
    this.myWorkExperience = new WorkExperience();
    this.selectedWorkExperienceId = null;
    this.btnTxt = 'Agregar';
  }

}
