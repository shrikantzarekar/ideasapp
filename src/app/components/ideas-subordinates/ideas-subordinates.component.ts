import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AngularFire,AuthProviders,AuthMethods} from 'angularfire2';

@Component({
  selector: 'app-ideas-subordinates',
  templateUrl: './ideas-subordinates.component.html',
  styleUrls: ['./ideas-subordinates.component.css']
})
export class IdeasSubordinatesComponent implements OnInit {
ideaslist : any;
id : any;
subordinates : any;
subordinateslist : any;
myuser :any;
search2:any;
count:any;
  constructor(
     public af:AngularFire,
        private firebaseService: FirebaseService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    //getSubordinate
    console.log("hi")
    this.subordinateslist =[];
    this.id = this.route.snapshot.params['id'];
    this.firebaseService.getIdeasUserDetails(this.id).subscribe(myuser =>{
      this.myuser=myuser;
      
      console.log(this.myuser);
      this.firebaseService.getSubordinate(this.myuser.Username).subscribe(subordinates =>{
      this.subordinates = subordinates;
      console.log(this.subordinates);
      //this.ideas = this.user.ideas;
      //console.log(this.ideas);
      let i =0;
      this.count = this.subordinates.length;
      for(let subordinate in this.subordinates){
        console.log(subordinate);
        this.firebaseService.getIdeasUserDetails(subordinates[subordinate]['$key']).subscribe(user =>{
          this.subordinateslist.push(user)
          console.log(this.subordinateslist);
        });
      }
    });
    });

  }



}
