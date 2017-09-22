import { Component, OnInit, HostBinding } from '@angular/core';
import {AngularFire,AuthProviders,AuthMethods} from 'angularfire2';
import {FirebaseService} from '../../services/firebase.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router,ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listings:any;
  username:any;
  password:any;
  uid:any;
  hideloginsectionbutton:boolean;
  showloginsectionbutton:boolean;
  constructor(
  	public af:AngularFire,
  	public flashMessage:FlashMessagesService,
    public firebaseService:FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.af.auth.subscribe(auth => { 
      if(auth) {
        //this.router.navigateByUrl('/members');
        this.hideloginsectionbutton=true;
      }else{
        this.hideloginsectionbutton=false;
      }
    });
  }

  ngOnInit() {
    let uid = "0";
    
  }

  login(){
  	//this.af.auth.login();
    var myemail = this.username;
    //console.log(this.password);
    this.af.auth.login(
      {
        email: myemail,//"101832@oc-gst.com",
        password:this.password//"98333589"
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
      (success) => {
      this.router.navigate(['/ideas-list/'+success.uid]);
      //do router
    }).catch(
      (err) =>{
        console.log(err);
        //do router
      });
  }

  editform(){
    console.log(this.af.auth.getAuth().uid);
    this.router.navigate(['/ideas-list/'+this.af.auth.getAuth().uid]);
  }

gotoportal(){
  this.af.auth.subscribe(auth => { 
      if(auth) {
        console.log(auth);
        this.router.navigateByUrl('/ideas-list/'+auth.auth.uid);
        this.hideloginsectionbutton=true;
      }
    });
}

gotoadminportal(){
  this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/ideas-adminlist/3bHlZrSYN6afukcNNsXDXrUq7NQ2');
        this.hideloginsectionbutton=true;
      }
    });
}

showloginsection(){
this.hideloginsectionbutton=false;
}
}
