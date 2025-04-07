import { Component } from '@angular/core';
import { HeaderService } from '../services/header-service/header.service';
import { Header }from '../models/header/header.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
   itemCount: number = 0;
   btnTxt: string = "Agregar";
   header: Header[] = [];
   myHeader: Header = new Header();
    constructor(public headerService: HeaderService)
    {
        console.log(this.headerService);
        this.headerService.getHeader().snapshotChanges().pipe(
          map(changes =>
            changes.map( c =>
             ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(data => {
          this.header = data;
          console.log(this.header);
        });
    }

  AgregarHeader(){
    console.log(this.headerService);
    this.headerService.createHeader(this.myHeader).then(() => {
       console.log('Created new item successfully!');
    });
  }

  deleteHeader(id? :string){
    this.headerService.deleteHeader(id).then(() => {
       console.log('Delete item successfully!');
    });
    console.log(id);
  }
  
  updateHeader(id? :string){
    alert('updating...');
  }
}
