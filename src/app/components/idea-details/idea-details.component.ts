import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css']
})
export class IdeaDetailsComponent implements OnInit {
userdata : IdeasUserData;
id : any;
name:string; employeeid:number;email:string;location:string;department:string;subdepartment:string;
reportingmanager:string;
  constructor(
        private firebaseService: FirebaseService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getIdeasUserDetails(this.id).subscribe(user =>{
      this.userdata = user;
      this.name = this.userdata.FirstName +" "+ this.userdata.LastName;
      this.employeeid=this.userdata.Username;
      this.email = this.userdata.Email;
      this.location=this.userdata.Location;
      this.department=this.userdata.Department;
      this.subdepartment=this.userdata.SubDepartment;
      this.reportingmanager=this.userdata.ReportingManagerFirstName + " " + this.userdata.ReportingManagerLastName;

    });
  }

  keyupHandlerFunction($event){

  }
}

interface IdeasUserData{
    LoginEmail?: string,
    Username?: number,
    FirstName?: string,
    LastName?: string,
    Email?: string,
    SubDepartment?: string,
    Department?: string,
    Location?: string,
    ReportingManagerUsername?: number,
    ReportingManagerFirstName?: string,
    ReportingManagerLastName?: string,
    ManagersManagerUsername?: number,
    ManagersManagerFirstName?: string,
    ManagersManagerLastName?: string
}