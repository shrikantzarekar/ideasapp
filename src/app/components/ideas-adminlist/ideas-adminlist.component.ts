import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AngularFire,AuthProviders,AuthMethods} from 'angularfire2';

@Component({
  selector: 'app-ideas-adminlist',
  templateUrl: './ideas-adminlist.component.html',
  styleUrls: ['./ideas-adminlist.component.css']
})
export class IdeasAdminlistComponent implements OnInit {
ideaslist : any;
id : any;
user : any;
ideas : any;
ideasdatalist : any;

search2:any;
count:any;

//ideasStatus = ['Rejected','On hold','Accepted','Evaluating'];

  constructor(
        public af:AngularFire,
        private firebaseService: FirebaseService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.ideasdatalist =[];
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getIdeasUserDetails(this.id).subscribe(user =>{
      this.user = user;
      this.ideas = this.user.ideas;
      //console.log(this.ideas);
      let i =0;
      this.count = this.ideas.length;
      for(let idea in this.ideas){
        this.firebaseService.getIdeasDetails(this.ideas[idea].ideakey).subscribe(ideadata =>{
          this.ideasdatalist.push(ideadata)
          console.log(this.ideasdatalist);
        });
      }
    });
  }

  searchProps(){    
    console.log(this.search2);
    this.firebaseService.getIdeasListingsById2(this.search2).subscribe(listings => { 
      this.ideasdatalist = listings;
      console.log(this.ideasdatalist);
    });
  }


gotorejectedidea(){    
    console.log(this.search2);
    this.firebaseService.getIdeasListingsByIdeasStatus('Rejected').subscribe(listings => { 
      this.ideasdatalist = listings;
      console.log(this.ideasdatalist);
    });
  }

gotoholdidea(){    
    console.log(this.search2);
    this.firebaseService.getIdeasListingsByIdeasStatus('On hold').subscribe(listings => { 
      this.ideasdatalist = listings;
      console.log(this.ideasdatalist);
    });
  }

gotoacceptedidea(){    
    console.log(this.search2);
    this.firebaseService.getIdeasListingsByIdeasStatus('Accepted').subscribe(listings => { 
      this.ideasdatalist = listings;
      console.log(this.ideasdatalist);
    });
  }  

gotoevaluatingidea(){    
    console.log(this.search2);
    this.firebaseService.getIdeasListingsByIdeasStatus('Evaluating').subscribe(listings => { 
      this.ideasdatalist = listings;
      console.log(this.ideasdatalist);
    });
  } 

  gotoaddidea(){
  this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/idea-add/'+auth.auth.uid);
      }
    });
}

}

