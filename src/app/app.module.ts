import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminCertificatesComponent } from './admin-certificates/admin-certificates.component';
import { AdminEducationComponent } from './admin-education/admin-education.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminInterestsComponent } from './admin-interests/admin-interests.component';
import { AdminLanguagesComponent } from './admin-languages/admin-languages.component';
import { AdminSkillsComponent } from './admin-skills/admin-skills.component';
import { AdminWorkexperienceComponent } from './admin-workexperience/admin-workexperience.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminCertificatesComponent,
    AdminEducationComponent,
    AdminHeaderComponent,
    AdminInterestsComponent,
    AdminLanguagesComponent,
    AdminSkillsComponent,
    AdminWorkexperienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
