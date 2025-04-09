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
   selectedCertificateId: string | null = null;

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
    if (this.selectedCertificateId) {
      this.certificatesService.updateCertificates(this.selectedCertificateId, this.myCertificates).then(() => {
        this.resetForm();
        console.log('Updated item successfully!');
      });
    } else {
      this.certificatesService.createCertificates(this.myCertificates).then(() => {
        this.resetForm();
        console.log('Created new item successfully!');
      });
    }

    /*console.log(this.certificatesService);
    this.certificatesService.createCertificates(this.myCertificates).then(() => {
       console.log('Created new item successfully!');
    });*/
  }

  deleteCertificates(id? :string){
    this.certificatesService.deleteCertificates(id).then(() => {
       console.log('Delete item successfully!');
    });
    console.log(id);
  }

  updateCertificates(certificados:any){
    this.myCertificates = {
      titulo: certificados.titulo, ano: certificados.ano, desc: certificados.desc, };
    this.selectedCertificateId = certificados.id;
    this.btnTxt = 'Update';
  }

  resetForm() {
    this.myCertificates = new Certificates();
    this.selectedCertificateId = null;
    this.btnTxt = 'Agregar';
  }
}
