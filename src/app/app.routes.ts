import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.service';



import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { NgProgressModule } from 'ng2-progressbar';
import { IdeaDetailsComponent } from './components/idea-details/idea-details.component';

import { SuperadminUsersComponent } from './components/superadmin-users/superadmin-users.component';
import { SuperadminDashboardComponent } from './components/superadmin-dashboard/superadmin-dashboard.component';
import { IdeaAddComponent } from './components/idea-add/idea-add.component';
import { IdeasListComponent } from './components/ideas-list/ideas-list.component';
import {IdeasAdminlistComponent} from './components/ideas-adminlist/ideas-adminlist.component';
import { IdeaEditComponent } from './components/idea-edit/idea-edit.component';
import { IdeaViewmanagerComponent } from './components/idea-viewmanager/idea-viewmanager.component';
import { IdeaViewdepartmentComponent } from './components/idea-viewdepartment/idea-viewdepartment.component';
import { IdeaViewComponent } from './components/idea-view/idea-view.component';
import { IdeasAdminviewComponent } from './components/ideas-adminview/ideas-adminview.component';
import {IdeasSubordinatesComponent} from './components/ideas-subordinates/ideas-subordinates.component';


export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
  

    {path: 'ideas/:id', component: IdeaDetailsComponent, canActivate: [AuthGuard]},
    {path: 'idea-add/:id', component: IdeaAddComponent, canActivate: [AuthGuard]},
    {path: 'ideas-list/:id', component: IdeasListComponent, canActivate: [AuthGuard]},
    {path: 'ideas-adminlist/:id', component: IdeasAdminlistComponent, canActivate: [AuthGuard]},
    {path: 'idea-edit/:id', component: IdeaEditComponent, canActivate: [AuthGuard]},
    {path: 'idea-viewmanager/:id', component: IdeaViewmanagerComponent, canActivate: [AuthGuard]},
    {path: 'idea-viewdepartment/:id', component: IdeaViewdepartmentComponent, canActivate: [AuthGuard]},
    {path: 'idea-view/:id', component: IdeaViewComponent, canActivate: [AuthGuard]},
    {path: 'idea-adminview/:id', component: IdeasAdminviewComponent, canActivate: [AuthGuard]},
    {path: 'thankyou', component: ThankyouComponent, canActivate: [AuthGuard]},
    {path: 'instructions', component: InstructionsComponent},
    {path: 'superadmin', component: SuperadminUsersComponent, canActivate: [AuthGuard]},
    {path: 'superadmindashboard', component: SuperadminDashboardComponent, canActivate: [AuthGuard]},
    {path: 'subordinates-list/:id', component: IdeasSubordinatesComponent, canActivate: [AuthGuard]},

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);