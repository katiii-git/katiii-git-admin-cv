import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests }from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrl: './admin-interests.component.css'
})
export class AdminInterestsComponent {
  itemCount: number = 0;
   btnTxt: string = "Agregar";
   interests: Interests[] = [];
   myInterests: Interests = new Interests();
    constructor(public interestsService: InterestsService)
    {
        console.log(this.interestsService);
        this.interestsService.getInterests().snapshotChanges().pipe(
          map(changes =>
            changes.map( c =>
             ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(data => {
          this.interests = data;
          console.log(this.interests);
        });
    }

  AgregarInterests(){
    console.log(this.interestsService);
    this.interestsService.createInterests(this.myInterests).then(() => {
       console.log('Created new item successfully!');
    });
  }

  deleteInterests(id? :string){
    this.interestsService.deleteInterests(id).then(() => {
       console.log('Delete item successfully!');
    });
    console.log(id);
  }

  updateInterests(id? :string){
    alert('updating...');
  }

}
