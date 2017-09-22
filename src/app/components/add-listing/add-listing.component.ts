import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

import {Http} from '@angular/http';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  title:any;
  owner:any;
  bedrooms:any;
  price:any;
  type:any;
  city:any;
  image:any;
  index:any;
  mstart:number[];
  mstop:number[];
  emailpasswordlist:any;

  CustomerName:any;
    Address:any;
    PinCode:any;
    Location:any;
    State:any;
    PhoneNo:any;
    MobileNo:any;
    Email:any;
    Pan:any;
    Vat:any;
    Ecc:any;
    Cst:any;
    CustomerCode:any;
    OptionSelected:any

    data:any;
    credentials:any;


  constructor(
  private firebaseService:FirebaseService,
  private router:Router,
  private http:Http
  ) { 
    this.http.get('data/data2.json').subscribe(res => this.data = res.json());
    this.http.get('data/UsernamePassword.json').subscribe(res2 => this.credentials = res2.json());
    this.mstart = new Array(50);
    this.mstop = new Array(50);
    this.mstart[0]=0;
    this.mstop[0]=99;
    this.mstart[1]=100;
    this.mstop[1]=199;
    
    for(let i=1;i<50;i++){
      this.mstart[i+1]=this.mstart[i]+100;
      this.mstop[i+1]= this.mstop[i]+100; 
    }
  }

  ngOnInit() {
    this.index=0;
    
  }

  onAddSubmit(){
  	let listing = {
  		title:this.title,
  		city:this.city,
  		owner:this.owner,
  		bedrooms:this.bedrooms,
  		price:this.price,
  		type:this.type
  	}

    

  	this.firebaseService.addListing(listing);
  	this.router.navigate(['listings']);
  }

    onAddSubmit2(){
    let myobj = [
      {
    "CustomerCode": 100001,
    "CustomerName": "Sri Rama Krishna Cement",
    "Address": "9-326, Adilabad Near Tirumala Filling Stn ADILABAD 504002 Telangana",
    "PinCode": 504002,
    "Location": "ADILABAD",
    "State": "Telangana",
    "PhoneNo": 9866124631,
    "MobileNo": "08732-227817",
    "Email": "",
    "Pan": "APQPL6166P"
  },
  {
    "CustomerCode": 100002,
    "CustomerName": "Preeti Marketing",
    "Address": "D.No.10-35, Manchiriyal Main Road,Opp Laxminarayan Temple ADILABAD 504208 Telangana",
    "PinCode": 504208,
    "Location": "ADILABAD",
    "State": "Telangana",
    "PhoneNo": 9848885562,
    "MobileNo": "",
    "Email": "",
    "Pan": "AHOPG0087A"
  }
  ];  

for (var oneobj in this.data){
let mydata2 = this.data[oneobj];
/*setTimeout(this.firebaseService.registerUser(this.credentials[oneobj].Username, this.credentials[oneobj].Password.toString()).then((user) => {
  mydata2["MyAuthid"]=user.uid;
  console.log(mydata2);
  this.firebaseService.addmyData(mydata2);
}), 500);
*/
      

console.log(mydata2);
this.firebaseService.addmyData(mydata2);
}
  	let mydata = {
  	CustomerName:this.CustomerName,
    Address:this.Address,
    PinCode:this.PinCode,
    Location:this.Location,
    State:this.State,
    PhoneNo:this.PhoneNo,
    MobileNo:this.MobileNo,
    Email:this.Email,
    Pan:this.Pan,
    Vat:this.Vat,
    Ecc:this.Ecc,
    Cst:this.Cst,
    CustomerCode:this.CustomerCode,
    OptionSelected:this.OptionSelected
  	}   

  	//this.firebaseService.addmyData(mydata);
  	this.router.navigate(['listings']);
  }




onAddSubmit3(){

for (let oneobj in this.credentials){
    let mydata2 = this.credentials[oneobj];
    this.firebaseService.registerUser(this.credentials[oneobj].Username, this.credentials[oneobj].Password.toString()).then((user) => {
      //this.credentials[oneobj]["MyAuthid"]=user.uid;
      //this.credentials[oneobj]["Password"]=this.credentials[oneobj].Password.toString();
      this.credentials[oneobj] = {
        "MyAuthid": user.uid,
        "Username": this.credentials[oneobj].Username,
        "Password": this.credentials[oneobj].Password.toString()

      };
     // console.log(user.uid);
     //  console.log(this.credentials);
      //this.firebaseService.storeUserData(mydata2);
    });
  }

}

onAddSubmit4(){
  this.mynewUserRegister(this.credentials[0].Username, this.credentials[0].Password.toString());
}
onAddSubmit5(){
  for(var i=0;i<this.mstart.length;i++){
    this.mynewUserRegister2(this.credentials[this.mstart[i]].Username, this.credentials[this.mstart[i]].Password.toString(),i);
  } 
}

onAddSubmit6(){
  this.index=112;
  this.mynewUserRegister(this.credentials[0].Username, this.credentials[0].Password.toString());
}
onAddSubmit7(){

  this.mynreUserRegister3();
}
mynewUserRegister(email,password){
    this.firebaseService.registerUser(email, password).then((user) => {
      this.credentials[this.index] = {
        "MyAuthid": user.uid,
        "Username": email,
        "Password": password
      };
      this.index++;
      if(this.index<20412){
        this.mynewUserRegister(this.credentials[this.index].Username, this.credentials[this.index].Password.toString());
      }else{
        return;
      }
    });
}
mynewUserRegister2(email,password,range){
    this.firebaseService.registerUser(email, password).then((user) => {
      this.credentials[this.mstart[range]] = {
        "MyAuthid": user.uid,
        "Username": email,
        "Password": password
      };
      this.mstart[range]++;
      if(this.mstart[range]<=this.mstop[range]){
        this.mynewUserRegister2(this.credentials[this.mstart[range]].Username, this.credentials[this.mstart[range]].Password.toString(),range);
      }else{
        return;
      }

    });
}

mynreUserRegister3(){
  if(typeof this.emailpasswordlist !='undefined'){
    for(var i =1; i<=this.credentials.length ; i++){
      this.emailpasswordlist.push({
      email: this.credentials[i].Username,
      password:this.credentials[i].Password.toString()
    });
    }
    
  }else{
    this.emailpasswordlist = [];
    var temp = {
      email: this.credentials[0].Username,
      password:this.credentials[0].Password.toString()
    };
    this.emailpasswordlist=[temp];
  }

  console.log(this.emailpasswordlist);

this.firebaseService.registerUserList(this.emailpasswordlist).then((users) => {
      //this.credentials[oneobj]["MyAuthid"]=user.uid;
      //this.credentials[oneobj]["Password"]=this.credentials[oneobj].Password.toString();
      
      console.log(users);
     //  console.log(this.credentials);
      //this.firebaseService.storeUserData(mydata2);
    });  

}





}
