import { Component } from '@angular/core';
import { EducationService} from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrl: './admin-education.component.css'
})
export class AdminEducationComponent {
itemCount: number =0;
  btnTxt: string = "Agregar";
  education: Education[] = [];
  myEducation: Education = new Education();
  selectedEducationId: string | null = null; 
  constructor(public educationService: EducationService)
        {
                console.log(this.educationService);
                this.educationService.getEducation().snapshotChanges().pipe(
                  map(changes =>
                     changes.map(c =>
                        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
                     )
                )
              ).subscribe(data => {
               this.education = data;
               console.log(this.education);
              });
        }

  agregarEducation(){
    if (this.selectedEducationId) {
      this.educationService.updateEducation(this.selectedEducationId, this.myEducation).then(() => {
        this.resetForm();
        console.log('Updated item successfully!');
      });
    } else {
        this.educationService.createEducation(this.myEducation).then(() => {
         this.resetForm();
        console.log('Created item successfully!');
      });
    }
      /*console.log(this.myEducation);
    this.educationService.createEducation(this.myEducation).then(()=>{
      console.log('Create new item successfully!');
    });*/
  }

  deleteEducation(id? :string){
    if (window.confirm('¿Estás seguro de que deseas eliminar este education?')) {
    this.educationService.deleteEducation(id).then(() => {
      console.log('Delete item successfully!');
    });
    console.log(id);
  } else {
    console.log('Eliminación cancelada.');
  }
      /*this.educationService.deleteEducation(id).then(()=>{
      console.log('Delete item successfully!');
    });
    	console.log(id);*/
  
  }
  updateEducation(educacion:any){
    this.myEducation = { fechaInic: educacion.fechaInic, fechaFin: educacion.fechaFin, titulo: educacion.titulo, escuela: educacion.escuela };
    this.selectedEducationId = educacion.id;
    this.btnTxt = 'Update';
  }

  resetForm() {
    this.myEducation = new Education();
    this.selectedEducationId = null;
    this.btnTxt = 'Agregar';
  }
}
