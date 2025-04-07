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
    console.log(this.myLanguage);
    this.languagesService.createLanguage(this.myLanguage).then(()=> {
      console.log('Created new item successfully!');
    });
  }

  deleteLanguage(id? :string){
    this.languagesService.deleteLanguage(id).then(()=> {
      console.log('delete item successfully!');
    });
      console.log(id);
  }
  updateLanguage(id? :string){
    alert('updating...');
  }
}
