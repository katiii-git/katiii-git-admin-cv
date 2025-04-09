import { Component } from '@angular/core';
import { SkillsService} from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrl: './admin-skills.component.css'
})
export class AdminSkillsComponent {
  itemCount: number =0;
	btnTxt: string = "Agregar";
	goalText: string = "";
	skills: Skills[] =[];
	mySkill: Skills = new Skills();
    selectedSkillId: string | null = null;

	constructor(public skillsService: SkillsService)
	{
		console.log(this.skillsService);
		this.skillsService.getSkills().snapshotChanges().pipe(
		  map(changes =>
		     changes.map(c =>
		        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
		     )
		)
	      ).subscribe(data => {
	       this.skills = data;
	       console.log(this.skills);
	      });
	}

	agregarSkill(){
      if (this.selectedSkillId) {
      this.skillsService.updateSkills(this.selectedSkillId, this.mySkill).then(() => {
        this.resetForm();
        console.log('Updated skill successfully!');
      });
    } else {
      // Si estamos agregando una nueva habilidad
      this.skillsService.createSkills(this.mySkill).then(() => {
        this.resetForm();
        console.log('Created new skill successfully!');
      });
    }  
      /* console.log(this.mySkill);
	  this.skillsService.createSkills(this.mySkill).then(()=> {
	   console.log('Created new item successfully!');
	  });*/
	}

	deleteSkill(id? :string){
	  this.skillsService.deleteSkills(id).then(()=>{
	    console.log('delete item successfully!');
	  });
	   console.log(id);
	}

    updateSkill(skill: any){
    this.mySkill = { skill: skill.skill, percentage: skill.percentage }; 
    this.selectedSkillId = skill.id;
    this.btnTxt = 'Update';
  }

    resetForm() {
    this.mySkill = new Skills();
    this.selectedSkillId = null;
    this.btnTxt = 'Agregar';
  }
    

}
