import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates }from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrl: './admin-certificates.component.css'
})
export class AdminCertificatesComponent {
   itemCount: number = 0;
   btnTxt: string = "Agregar";
   certificates: Certificates[] = [];
   myCertificates: Certificates = new Certificates();
    constructor(public certificatesService: CertificatesService)
    {
        console.log(this.certificatesService);
        this.certificatesService.getCertificates().snapshotChanges().pipe(
          map(changes =>
            changes.map( c =>
             ({ id: c.payload.doc.id, ...c.payload.doc.data() })
            )
          )
        ).subscribe(data => {
          this.certificates = data;
          console.log(this.certificates);
        });
    }

  AgregarCertificates(){
    console.log(this.certificatesService);
    this.certificatesService.createCertificates(this.myCertificates).then(() => {
       console.log('Created new item successfully!');
    });
  }

  deleteCertificates(id? :string){
    this.certificatesService.deleteCertificates(id).then(() => {
       console.log('Delete item successfully!');
    });
    console.log(id);
  }

  updateCertificates(id? :string){
    alert('updating...');
  }
}
