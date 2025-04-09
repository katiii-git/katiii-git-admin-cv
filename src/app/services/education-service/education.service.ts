import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Education } from '../../models/education/education.model';


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private dbPath = '/education';

  educationRef: AngularFirestoreCollection<Education>;

  constructor(private db: AngularFirestore) {
        this.educationRef = db.collection(this.dbPath);
  }

  getEducation(): AngularFirestoreCollection<Education>{
    return this.educationRef;
  }

  createEducation(myEducation: Education): any {
    return this.educationRef.add({ ...myEducation});
  }

  deleteEducation(id? : string): Promise<void>{
    return this.educationRef.doc(id).delete();
  }
  
  updateEducation(id: string, educationData: Education): Promise<void> {
    return this.educationRef.doc(id).update({ ...educationData });
 }

}
