import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-idea-viewmanager',
  templateUrl: './idea-viewmanager.component.html',
  styleUrls: ['./idea-viewmanager.component.css']
})
export class IdeaViewmanagerComponent implements OnInit {
userdata : IdeasUserData;
ideadata : IdeasIdeaData;
manageruid : string;
id : any;
name:string; employeeid:number;email:string;location:string;department:string;subdepartment:string;
reportingmanager:string;

image:any;
  constructor(
        private firebaseService: FirebaseService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.makeblankidea2();
    this.firebaseService.getIdeasDetails(this.id).subscribe(idea =>{
      this.ideadata =idea;
      /* not required call getsubordinate to get list of subordinates
      this.firebaseService.getManager(this.userdata.ReportingManagerUsername).subscribe(managerdata=>{
        this.manageruid=managerdata[0]['$key'];
      }); */

    });

  }


  editidea(){
    this.firebaseService.editIdea(this.id.toString(), this.ideadata);
        this.flashMessage.show('Thank you ' + this.name + ' for update!', {
            cssClass: 'alert-success',
            timeout: 6000
        });
  }

  makeblankidea2(){
    this.ideadata= {
                    id:this.id,
                    IdeasStatus: "",
                    IdeaSecondedby: "",
                    IdeaSecondedbyUid: "",

                    IdeaSecondedByDepartmentNameStatus: "",
                    IdeaSecondedByManagerStatus: "",

                    IdeaProposedBy:"",
                    IdeaSecondedByManagerName:"",
                    IdeaTeamMembers:"",
                    IdeaSecondedByDepartmentName:"",
                    IdeaTitle: "",
                    IdeaRevenueImpact: "",
                    IdeaCostImpact: "",
                    IdeaImpactArea: "",
                    IdeaImpactType: "",
                    IdeaCapitalInvestment: "",
                    IdeaReourcesDescription: "",
                    IdeaChallengesDescription: "",
                    IdeaPrimaryPartnerDepartment:"",
                    IdeaOtherPartnerDepartment:"",
                    IdeaAttachmentName:"",
                    IdeaAttachmentLink:""
                  };
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

interface IdeasIdeaData{
  id?:string;
  IdeasStatus?: string;
  IdeaSecondedby?: string;
  IdeaSecondedbyUid?: string;

  IdeaSecondedByDepartmentNameStatus?: string;
  IdeaSecondedByManagerStatus?:string;

  IdeaProposedBy?:string;
  IdeaSecondedByManagerName?:string;
  IdeaTeamMembers?:string;
  IdeaSecondedByDepartmentName?:string;
  IdeaTitle?: string;
  IdeaRevenueImpact?: string;
  IdeaCostImpact?: string;
  IdeaImpactArea?: string;
  IdeaImpactType?: string;
  IdeaCapitalInvestment?: string;
  IdeaReourcesDescription?: string;
  IdeaChallengesDescription?: string;
  IdeaPrimaryPartnerDepartment?:string;
  IdeaOtherPartnerDepartment?:string;
  IdeaAttachmentName?:string;
  IdeaAttachmentLink?:string;


  
}