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
   selectedHeaderId: string | null = null;
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
    if (this.selectedHeaderId) {
      // Si estamos editando
      this.headerService.updateHeader(this.selectedHeaderId, this.myHeader).then(() => {
        this.resetForm();
        console.log('Updated item successfully!');
      });
    } else {
      // Si estamos agregando
      this.headerService.createHeader(this.myHeader).then(() => {
        this.resetForm();
        console.log('Created new item successfully!');
      });
    }
      
    /*console.log(this.headerService);
    this.headerService.createHeader(this.myHeader).then(() => {
       console.log('Created new item successfully!');
    });*/
  }

  deleteHeader(id? :string){
      if (window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
    this.headerService.deleteHeader(id).then(() => {
      console.log('Delete item successfully!');
    });
    console.log(id);
  } else {
    console.log('Eliminación cancelada.');
  }
/*    this.headerService.deleteHeader(id).then(() => {
       console.log('Delete item successfully!');
    });
    console.log(id);*/
  }
  
  updateHeader(header: any){
    this.myHeader={
          name: header.name, goalLife: header.goalLife, photoURL: header.photoURL, email: header.email, phoneNumber: header.phoneNumber, location: header.location, socialNetwork: header.socialNetwork };
          this.selectedHeaderId=header.id;
          this.btnTxt="Update";
  }
  resetForm() {
    this.myHeader = new Header();
    this.selectedHeaderId = null;
    this.btnTxt = "Agregar";
  }
}
