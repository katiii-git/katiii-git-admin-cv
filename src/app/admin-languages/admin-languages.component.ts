import { Component } from '@angular/core';
import { LanguagesService} from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrl: './admin-languages.component.css'
})
export class AdminLanguagesComponent {
  itemCount: number =0;  
  btnTxt: string ="Agregar";
  languages: Languages[] =[];
  myLanguage: Languages = new Languages();
  selectedLanguageId: string | null = null;

  constructor(public languagesService: LanguagesService)
  {
  	console.log(this.languagesService);
		this.languagesService.getLanguages().snapshotChanges().pipe(
		  map(changes =>
		     changes.map(c =>
		        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
		     )
		)
	      ).subscribe(data => {
	       this.languages = data;
	       console.log(this.languages);
	      });
        }

  agregarLanguage(){
    if (this.selectedLanguageId) {
      
      this.languagesService.updateLanguage(this.selectedLanguageId, this.myLanguage).then(() => {
        this.resetForm();
        console.log('Updated successfully!');
      });
    } else {

      this.languagesService.createLanguage(this.myLanguage).then(() => {
        this.resetForm();
        console.log('Created successfully!');
      });
    }
      /*console.log(this.myLanguage);
    this.languagesService.createLanguage(this.myLanguage).then(()=> {
      console.log('Created new item successfully!');
    });*/
  }

  deleteLanguage(id? :string){
    if (window.confirm('¿Estás segura de que deseas eliminar este idioma?')) {
      this.languagesService.deleteLanguage(id).then(() => {
      console.log('delete item successfully!');
    });
    console.log(id);
  } else {
      console.log('Eliminación cancelada.');
    }

/*    this.languagesService.deleteLanguage(id).then(()=> {
      console.log('delete item successfully!');
    });
      console.log(id);*/
  }
  updateLanguage(language :any){
    this.myLanguage = { language: language.language };
    this.selectedLanguageId = language.id;
    this.btnTxt = 'Update';
  }

  resetForm() {
    this.myLanguage = new Languages();
    this.selectedLanguageId = null;
    this.btnTxt = 'Agregar';
  }

}
