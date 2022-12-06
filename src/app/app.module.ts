import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobRegistrationComponent } from './components/job-registration/job-registration.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { JobsDialogComponent } from './components/jobs-dialog/jobs-dialog.component';
import { RatingComponent } from './components/rating/rating.component';
import { UserJobsComponent } from './components/user-jobs/user-jobs.component';
import { HistoryLogComponent } from './components/history-log/history-log.component';
import { JobUpdateComponent } from './components/job-update/job-update.component';
import { UserSectionComponent } from './components/user-section/user-section.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { CookieModule } from 'ngx-cookie';
import { Page404Component } from './components/page404/page404.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';








@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    JobsComponent,
    JobRegistrationComponent,
    LoginComponent,
    SignupComponent,
    JobsDialogComponent,
    RatingComponent,
    UserJobsComponent,
    HistoryLogComponent,
    JobUpdateComponent,
    UserSectionComponent,
    DeleteDialogComponent,
    UserUpdateComponent,
    MyJobsComponent,
    Page404Component,
    LandingPageComponent

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    CookieModule.withOptions()
    
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
