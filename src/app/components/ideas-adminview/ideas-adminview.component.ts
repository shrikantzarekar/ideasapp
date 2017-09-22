import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AngularFire,AuthProviders,AuthMethods} from 'angularfire2';

@Component({
  selector: 'app-ideas-adminview',
  templateUrl: './ideas-adminview.component.html',
  styleUrls: ['./ideas-adminview.component.css']
})
export class IdeasAdminviewComponent implements OnInit {
userdata : IdeasUserData;
ideadata : IdeasIdeaData;
manageruid : string;
id : any;
hideprogress:boolean;
name:string; employeeid:number;email:string;location:string;department:string;subdepartment:string;
reportingmanager:string;

ideaScoreRevenueImpact = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1','0'];
ideaScoreCostSavingImpact= ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1','0'];
ideaScoreInvestmentImpact = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1','0'];
ideaScoreProcessImpact = ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1','0'];
ideasStatus = ['Rejected','On hold','Accepted','Evaluating'];
image:any;
  constructor(
        public af:AngularFire,
        private firebaseService: FirebaseService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService) { 
          this.hideprogress=true;
          
        }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.makeblankidea2();
    //this.makeblankidea2();
    this.firebaseService.getIdeasDetails(this.id).subscribe(idea =>{
      this.ideadata =idea;
                 
      /* not required call getsubordinate to get list of subordinates
      this.firebaseService.getManager(this.userdata.ReportingManagerUsername).subscribe(managerdata=>{
        this.manageruid=managerdata[0]['$key'];
      }); */

    });

  }


  rateidea(){
    this.hideprogress=false;
  
    this.ideadata.IdeasScore=parseInt(this.ideadata.IdeaScoreRevenueImpact)+parseInt(this.ideadata.IdeaScoreCostSavingImpact)+parseInt(this.ideadata.IdeaScoreCostSavingImpact)+parseInt(this.ideadata.IdeaScoreInvestmentImpact);
      console.log(this.id);
   
      if(this.ideadata.IdeasStatus=='Rejected'){
          this.ideadata.IdeaRejectedDate =Date.now();
      }else if(this.ideadata.IdeasStatus=='On hold'){
          this.ideadata.IdeaOnHoldDate =Date.now();
      }else if(this.ideadata.IdeasStatus=='Accepted'){
          this.ideadata.IdeaAcceptedDate =Date.now();
      }
      else if(this.ideadata.IdeasStatus=='Evaluating'){
          this.ideadata.IdeaEvaluatingDate =Date.now();
      };

      let finaldata = this.maketheobject();

      if(!finaldata.IdeaRejectedDate){finaldata.IdeaRejectedDate = 1};
      if(!finaldata.IdeaAcceptedDate){finaldata.IdeaAcceptedDate = 1};
      if(!finaldata.IdeaOnHoldDate){finaldata.IdeaOnHoldDate = 1};
      if(!finaldata.IdeaEvaluatingDate){finaldata.IdeaEvaluatingDate = 1};

      //console.log(finaldata);

      this.firebaseService.myrateIdeasDetails3(this.id, finaldata);
      //this.firebaseService.myrateIdeasDetails(this.id, this.ideadata);
        this.flashMessage.show('Thank you ' + this.name + ' for update!', {
            cssClass: 'alert-success',
            timeout: 6000
        });
  }

  maketheobject(){
    return {
                    id:this.ideadata.id,
                    IdeasStatus: this.ideadata.IdeasStatus,
                    IdeaSecondedby: this.ideadata.IdeaSecondedby,
                    IdeaSecondedbyUid: this.ideadata.IdeaSecondedbyUid,

                    IdeaSecondedByDepartmentNameStatus: this.ideadata.IdeaSecondedByDepartmentNameStatus,
                    IdeaSecondedByManagerStatus: this.ideadata.IdeaSecondedByManagerStatus,

                    IdeaProposedBy:this.ideadata.IdeaProposedBy,
                    IdeaSecondedByManagerName:this.ideadata.IdeaSecondedByManagerName,
                    IdeaTeamMembers:this.ideadata.IdeaTeamMembers,
                    IdeaSecondedByDepartmentName:this.ideadata.IdeaSecondedByDepartmentName,
                    IdeaTitle: this.ideadata.IdeaTitle,
                    IdeaRevenueImpact: this.ideadata.IdeaRevenueImpact,
                    IdeaCostImpact: this.ideadata.IdeaCostImpact,
                    IdeaImpactArea: this.ideadata.IdeaImpactArea,
                    IdeaImpactType: this.ideadata.IdeaImpactType,
                    IdeaCapitalInvestment: this.ideadata.IdeaCapitalInvestment,
                    IdeaReourcesDescription: this.ideadata.IdeaReourcesDescription,
                    IdeaChallengesDescription: this.ideadata.IdeaChallengesDescription,
                    IdeaPrimaryPartnerDepartment:this.ideadata.IdeaPrimaryPartnerDepartment,
                    IdeaOtherPartnerDepartment:this.ideadata.IdeaOtherPartnerDepartment,
                    IdeaAttachmentName:this.ideadata.IdeaAttachmentName,
                    IdeaAttachmentLink:this.ideadata.IdeaAttachmentLink,

                    IdeaDate:this.ideadata.IdeaDate,
                    IdeaLocation:this.ideadata.IdeaLocation,

                    IdeaScoreRevenueImpact:this.ideadata.IdeaScoreRevenueImpact,
                    IdeaScoreCostSavingImpact:this.ideadata.IdeaScoreCostSavingImpact,
                    IdeaScoreInvestmentImpact:this.ideadata.IdeaScoreInvestmentImpact,
                    IdeaScoreProcessImpact:this.ideadata.IdeaScoreProcessImpact,
                    IdeaScoreComments:this.ideadata.IdeaScoreComments,
                    IdeasScore:this.ideadata.IdeasScore,
                    IdeaComment:this.ideadata.IdeaComment,
                    IdeaProposedByEmail:this.ideadata.IdeaProposedByEmail,

                    IdeaRejectedDate:this.ideadata.IdeaRejectedDate,
                    IdeaAcceptedDate:this.ideadata.IdeaAcceptedDate,
                    IdeaOnHoldDate:this.ideadata.IdeaOnHoldDate,
                    IdeaEvaluatingDate:this.ideadata.IdeaEvaluatingDate

    }
  }
gotoideaslist(){
  this.hideprogress=true;
  this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/ideas-adminlist/'+auth.auth.uid);
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
                    IdeaComment:"",
                    IdeaProposedByEmail:"",
                    IdeaRejectedDate: 1,
                    IdeaAcceptedDate: 1,
                    IdeaOnHoldDate: 1,
                    IdeaEvaluatingDate: 1
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
  IdeaComment?:string;

  IdeaProposedByEmail?:string;
  IdeaRejectedDate?:number;
  IdeaAcceptedDate?:number;
  IdeaOnHoldDate?:number;
  IdeaEvaluatingDate?:number;
  
}