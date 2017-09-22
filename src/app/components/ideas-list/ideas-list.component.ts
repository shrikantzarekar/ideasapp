import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AngularFire,AuthProviders,AuthMethods} from 'angularfire2';

@Component({
  selector: 'app-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.css']
})
export class IdeasListComponent implements OnInit {
ideaslist : any;
id : any;
user : any;
ideas : any;
ideasdatalist : any;
search2:any;
count:any;

admin:boolean;

  constructor(
        public af:AngularFire,
        private firebaseService: FirebaseService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.admin=false;
    this.ideasdatalist =[];
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getIdeasUserDetails(this.id).subscribe(user =>{
      this.user = user;
      if(this.user.admin){
        if(this.user.admin==true){
          this.admin=true;
        }
      }
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
    this.firebaseService.getIdeasListingsById(this.search2).subscribe(listings => { 
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

gotoadminidea(){
  this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/ideas-adminlist/3bHlZrSYN6afukcNNsXDXrUq7NQ2');
      }
    });
}

}
