import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router,ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public af:AngularFire,
    private router: Router,
    private route: ActivatedRoute,
    public flashMessage:FlashMessagesService
    ) { }

  ngOnInit() {
  }

  login(){
  	//this.af.auth.login();
    this.router.navigate(['']);
  }

  logout(){
  	this.af.auth.logout();
    this.router.navigateByUrl('/home');
    this.flashMessage.show('You are logout', {cssClass:'alert-success',timeout: 3000});
  }

}
