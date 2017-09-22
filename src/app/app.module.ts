import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { AppComponent } from './app.component';
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
import { IdeaEditComponent } from './components/idea-edit/idea-edit.component';
import { IdeaViewmanagerComponent } from './components/idea-viewmanager/idea-viewmanager.component';
import { IdeaViewdepartmentComponent } from './components/idea-viewdepartment/idea-viewdepartment.component';
import { IdeaViewComponent } from './components/idea-view/idea-view.component';

//import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { AuthGuard } from './auth.service';
import { routes } from './app.routes';
import { IdeasSubordinatesComponent } from './components/ideas-subordinates/ideas-subordinates.component';
import { IdeasAdminlistComponent } from './components/ideas-adminlist/ideas-adminlist.component';
import { IdeasAdminviewComponent } from './components/ideas-adminview/ideas-adminview.component';


const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

// your firebase config
export const firebaseConfig = {
    apiKey: '',
    authDomain: '.firebaseapp.com',
    databaseURL: 'https://.firebaseio.com',
    projectId: '',
    storageBucket: '.appspot.com',
    messagingSenderId: ''
};

/*
export const firebaseConfig = {
    apiKey: '',
    authDomain: '.firebaseapp.com',
    databaseURL: 'https://.firebaseio.com',
    projectId: '',
    storageBucket: '.appspot.com',
    messagingSenderId: ''
};


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'listings', component: ListingsComponent},
  {path: 'listing/:id', component: ListingComponent},
  {path: 'listing/edit/:id', component: EditListingComponent},
  {path: 'ideas', component: IdeaListComponent},
  {path: 'ideas/:id', component: IdeaDetailsComponent},
  {path: 'idea-add/:id', component: IdeaAddComponent},
  {path: 'ideas-list/:id', component: IdeasListComponent},
  {path: 'idea-edit/:id', component: IdeaEditComponent},
  {path: 'idea-viewmanager/:id', component: IdeaViewmanagerComponent},
  {path: 'idea-viewdepartment/:id', component: IdeaViewdepartmentComponent},
  {path: 'idea-view/:id', component: IdeaViewComponent},
  {path: 'add-listing', component: AddListingComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'instructions', component: InstructionsComponent},
  {path: 'superadmin', component: SuperadminUsersComponent},
  {path: 'superadmindashboard', component: SuperadminDashboardComponent},
]*/
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
    ThankyouComponent,
    InstructionsComponent,
    IdeaDetailsComponent,
    SuperadminUsersComponent,
    SuperadminDashboardComponent,
    IdeaAddComponent,
    IdeasListComponent,
    IdeaEditComponent,
    IdeaViewmanagerComponent,
    IdeaViewdepartmentComponent,
    IdeaViewComponent,
    IdeasSubordinatesComponent,
    IdeasAdminlistComponent,
    IdeasAdminviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    CarouselModule.forRoot(),
    NgProgressModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routes,  
  ],
  providers: [FirebaseService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
