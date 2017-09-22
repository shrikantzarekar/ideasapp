import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AngularFire,AuthProviders,AuthMethods} from 'angularfire2';
 import { NguiAutoCompleteModule } from '@ngui/auto-complete';

@Component({
  selector: 'app-idea-add',
  templateUrl: './idea-add.component.html',
  styleUrls: ['./idea-add.component.css']
})
export class IdeaAddComponent implements OnInit {
userdata : IdeasUserData;
ideadata : IdeasIdeaData;
manageruid : string;
id : any;
name:string; employeeid:number;email:string;location:string;department:string;subdepartment:string;
reportingmanager:string;
arrayOfStrings = ['this', 'is', 'list', 'of', 'string', 'element'];

impactareas = ['Revenue Maximization', 'Brand Building', 'Productivity improvement', 'Work Simplification', 'Safety Standards', 'Maintenance & Utilization', 'Machine Regarding', 'Wastage', 'Cost Saving', 'Others'];
impacttype= ['Short term', 'Medium term', 'Long term', 'Un-Sure'];
primarypartnerdepartment = ['Qualtiy', 'Sales', 'Marketing', 'Manufacturing', 'HR'];
otherpartnerdepartment = ['Qualtiy', 'Sales', 'Marketing', 'Manufacturing', 'HR'];


image:any;
  constructor(
        public af:AngularFire,
        private firebaseService: FirebaseService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService) { 
      
           
        }

  ngOnInit() {
         this.arrayOfStrings = ['this', 'is', 'list', 'of', 'string', 'element'];
    this.id = this.route.snapshot.params['id'];
    this.makeblankidea2();
    this.firebaseService.getIdeasUserDetails(this.id).subscribe(user =>{
      this.userdata = user;
      this.name = this.userdata.FirstName +" "+ this.userdata.LastName;
      this.employeeid=this.userdata.Username;
      this.email = this.userdata.Email;
      this.location=this.userdata.Location;
      this.department=this.userdata.Department;
      this.subdepartment=this.userdata.SubDepartment;
      this.reportingmanager=this.userdata.ReportingManagerFirstName + " " + this.userdata.ReportingManagerLastName;
      
      this.ideadata.IdeaProposedBy = this.name;
      this.ideadata.IdeaSecondedByManagerName = this.reportingmanager;
      this.ideadata.IdeaSecondedByDepartmentName = this.department;
      this.ideadata.IdeaSecondedByDepartmentNameStatus = this.department+ "";
      this.ideadata.IdeaSecondedByManagerStatus = this.reportingmanager + "";
      this.ideadata.IdeasStatus = "Generated";
      this.ideadata.IdeaDate = Date.now();
      this.ideadata.IdeaLocation = this.location +"";
      this.ideadata.IdeaProposedByEmail=this.email;

      /*
      Shrikant 
       */


      /* not required call getsubordinate to get list of subordinates
      this.firebaseService.getManager(this.userdata.ReportingManagerUsername).subscribe(managerdata=>{
        this.manageruid=managerdata[0]['$key'];
      }); */

    });
  }


  addidea(){
   this.firebaseService.addIdea(this.id, this.ideadata);
   //this.firebaseService.addIdea("3bHlZrSYN6afukcNNsXDXrUq7NQ2", this.ideadata);  
        this.flashMessage.show('Thank you ' + this.name + ' for update!', {
            cssClass: 'alert-success',
            timeout: 6000
        });
        
  }
  gotoideaslist(){
  this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/ideas-list/'+auth.auth.uid);
      } 
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
                    IdeaAttachmentLink:"",
                    IdeaDate:0,
                    IdeaLocation:"",

                    IdeaScoreRevenueImpact:"",
                    IdeaScoreCostSavingImpact:"",
                    IdeaScoreInvestmentImpact:"",
                    IdeaScoreProcessImpact:"",
                    IdeaScoreComments:"",
                    IdeasScore:0,
                    IdeaProposedByEmail:""
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

  IdeaDate?:number;
  IdeaLocation?:string;

  IdeaScoreRevenueImpact?:string;
  IdeaScoreCostSavingImpact?:string;
  IdeaScoreInvestmentImpact?:string;
  IdeaScoreProcessImpact?:string;
  IdeaScoreComments?:string;
  IdeasScore?:number;

  IdeaProposedByEmail?:string;

  
}