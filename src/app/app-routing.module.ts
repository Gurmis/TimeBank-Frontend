import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobRegistrationComponent } from './components/job-registration/job-registration.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HistoryLogComponent } from './components/history-log/history-log.component';
import { UserJobsComponent } from './components/user-jobs/user-jobs.component';
import { JobUpdateComponent } from './components/job-update/job-update.component';
import { UserSectionComponent } from './components/user-section/user-section.component';
import { AuthGuard } from './guards/auth.guard';
import { MyJobsComponent } from './components/my-jobs/my-jobs.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { AfterLoginGuard } from './guards/after-login.guard';
import { Page404Component } from './components/page404/page404.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard]},
  { path: 'job-registration', component: JobRegistrationComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AfterLoginGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AfterLoginGuard] },
  { path: 'log', component: HistoryLogComponent, canActivate: [AuthGuard] },
  { path: 'users/:userId/jobs', component: UserJobsComponent, canActivate: [AuthGuard] },
  { path: 'user-section/jobs/update', component: JobUpdateComponent, canActivate: [AuthGuard] },
  { path: 'user-section', component: UserSectionComponent, canActivate: [AuthGuard] },
  { path: 'personal-details', component: UserUpdateComponent, canActivate: [AuthGuard] },
  { path: 'my-jobs', component: MyJobsComponent, canActivate: [AuthGuard] },
  { path: 'log', component: HistoryLogComponent, canActivate: [AuthGuard] },
  { path: '', component: LandingPageComponent, canActivate: [AfterLoginGuard] },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
