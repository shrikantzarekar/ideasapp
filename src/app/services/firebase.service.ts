import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {NgProgressService} from "ng2-progressbar";
import {Router,ActivatedRoute,Params} from '@angular/router';

@Injectable()
export class FirebaseService {

  listings:FirebaseListObservable<any[]>;
  listing:FirebaseObjectObservable<any[]>;
  image:FirebaseObjectObservable<any[]>;
  images:FirebaseListObservable<any[]>;
  mydata:FirebaseListObservable<any[]>;
  data:FirebaseObjectObservable<any[]>;
  ideadata:FirebaseListObservable<any[]>;
  ideadataadmin:any;
  ideauserdata:FirebaseListObservable<any[]>;
  mylistings:any;
  folder:any;
  myimages:any;
  progress:any;
  userlistdata:FirebaseListObservable<any[]>;
  count:any;

  constructor(private af:AngularFire, private pService: NgProgressService,private router: Router,
        private route: ActivatedRoute) { 
    this.folder = 'listingimages';
    this.listings = this.af.database.list('/listings') as FirebaseListObservable<Listing[]>;
    this.mydata = this.af.database.list('/database') as FirebaseListObservable<MyData[]>;
    this.userlistdata = this.af.database.list('/users') as FirebaseListObservable<MyUsers[]>;
    this.images = this.af.database.list('/images') as FirebaseListObservable<Listing[]>;

    this.ideadata = this.af.database.list('/ideas') as FirebaseListObservable<IdeasIdeaData[]>;
    this.ideadataadmin = this.af.database.list('/ideas');
    this.ideauserdata = this.af.database.list('/myusers') as FirebaseListObservable<IdeasIdeaData[]>;

    this.mylistings = this.af.database.list('/listings');
    this.progress=0;
  }

  getuid(){
    return this.af.auth.getAuth().uid;
  }

  getListings(){
    return this.listings;
  }  
  getListingDetails(id){
    this.listing = this.af.database.object('/listings/'+id) as FirebaseObjectObservable<Listing>;
    return this.listing;
  }  

  getDataDetails(id){
    this.data = this.af.database.object('/database/'+id) as FirebaseObjectObservable<Data>;
    return this.data;
  }  

  getIdeasUserDetails(id){
    this.data = this.af.database.object('/myusers/'+id) as FirebaseObjectObservable<IdeasUserData>;
    return this.data;
  }

  getIdeasDetails(id){
    this.data = this.af.database.object('/ideas/'+id) as FirebaseObjectObservable<IdeasIdeaData>;
    return this.data;
  }

  myrateIdeasDetails(id,mydata){
    
    this.ideadata.update(id , mydata);
    return ;
  }

myrateIdeasDetails2(id,mydata){
  //this.data = this.af.database.object('/ideas/'+id)
    this.ideadata.update(id , mydata);
    return ;
  }
  myrateIdeasDetails3(id,mydata){
   this.data = this.af.database.object('/ideas/'+id) as FirebaseObjectObservable<IdeasIdeaData>;
   this.data.set(mydata);

    return ;
  }
  getListingImages(id: any):Observable<Image[]>{
    return this.af.database.list('images')
      .map(_images => _images.filter(image => image.propid == id));
  }
  getSubordinate(id: any):Observable<IdeasUserData[]>{
    return this.af.database.list('myusers')
      .map(_images => _images.filter(users => users.ReportingManagerUsername == id));
  }
  getManager(id: any):Observable<IdeasUserData[]>{
    return this.af.database.list('myusers')
      .map(_images => _images.filter(users => users.Username == id));
  }
  getListingsImageKey(propid: any){
  var ref = firebase.database().ref("images");
  ref.orderByChild("propid").equalTo(propid).on("child_added", function(snapshot) {
    
  });
  }
  getListingsByTitle(title: any): Observable<Listing[]> {
    return this.af.database.list('listings')
      .map(_listings => _listings.filter(listing => listing.title.toLowerCase().indexOf(title) !== -1));

  }d
  getIdeasListingsById(id: any): Observable<IdeasIdeaData[]> {
    return this.af.database.list('ideas')
      .map(_listings => _listings.filter(listing => listing.id==id));

  }

  getIdeasListingsByIdeasStatus(id: any): Observable<IdeasIdeaData[]> {
    return this.af.database.list('ideas')
      .map(_listings => _listings.filter(listing => listing.IdeasStatus == id));
  }

  getIdeasListingsById2(id: any): Observable<IdeasIdeaData[]> {
    return this.af.database.list('ideas')
      .map(_listings => _listings.filter(listing => listing.IdeaProposedBy.indexOf(id)>=0));
  }



  deleteImage(id){
    this.image = this.af.database.object('/images/'+id) as FirebaseObjectObservable<Image>;
    return this.image.remove();
  }
  deleteListing(id){
    this.listing = this.af.database.object('/listings/'+id) as FirebaseObjectObservable<Listing>;
    return this.listing.remove();
  }
  addListing(listing){
    //create root ref
    let storageRef = firebase.storage().ref();
    let files = [(<HTMLInputElement>document.getElementById('image')).files];
    let propRef = this.listings.push(listing);
    for(var i=0;i<files[0].length;i++){
      let random = Math.floor(Math.random() * 500) + 1  ;
      let selectedFile = files[0][i];
      let path = `/${this.folder}/${random}${selectedFile.name}`;
      //let iRef = ;
      let uploadTask = storageRef.child(path).put(selectedFile).then((snapshot)=>{
        let image = {
          name:selectedFile.name,
          path:path,
          propid:propRef.key
        }
        return this.images.push(image);
      });

    }


  }

  addmyData(mydata){
    //create root ref
    let storageRef = firebase.storage().ref();
    //let files = [(<HTMLInputElement>document.getElementById('image')).files];
    let propRef = this.mydata.push(mydata);
  }

storeUserData(mydata){
    //create root ref
    let storageRef = firebase.storage().ref();
    //let files = [(<HTMLInputElement>document.getElementById('image')).files];
    let userRef = this.userlistdata.push(mydata);
  }

  ststoreUserData2(mydata){
    //let storageRef = firebase.storage().ref();
    //let userRef = this.userlistdata.update(mydata);

  }

  registerUser(email, password) {
    //console.log(email);
    return this.af.auth.createUser({
      email: email,
      password: password
    });
  }
registerUserList(emailpasswordlist) {
    //console.log(email);
    return this.af.auth.createUser(emailpasswordlist);
  }
  /*
  .then(
      (success) => {
      //console.log(success);
      //do router
    }).catch(
      (err) =>{
        console.log(err);
        //do router
      }
    )
    */

  editListing(key,listing){
    this.listings.update(key,listing);

    //update images
    let storageRef = firebase.storage().ref();
    let files = [(<HTMLInputElement>document.getElementById('image')).files];
    let random = Math.floor(Math.random() * 500) + 1  ;
    for(var i=0;i<files[0].length;i++){
      let selectedFile = files[0][i];
      let path = `/${this.folder}/${random}${selectedFile.name}`;
      let iRef = storageRef.child(path);
      let uploadTask = iRef.put(selectedFile).then((snapshot)=>{
        let image = {
          name:selectedFile.name,
          path:path,
          propid:listing.id
        }
        return this.images.push(image);
      });

    }
  }

editDataListing(key,data){
    this.mydata.update(key,data);
    this.count = 0;

    //update images
    let storageRef = firebase.storage().ref();
    for(var j =0; j<data.GSTDatas.length; j++){
    let files = [(<HTMLInputElement>document.getElementById('image'+j)).files];
    let random = Math.floor(Math.random() * 500) + 1  ;
    for(var i=0;i<files[0].length;i++){
      let selectedFile = files[0][i];
      let path = `/${this.folder}/${random}${selectedFile.name}`;
      let iRef = storageRef.child(path);
      this.pService.start();
      let uploadTask = iRef.put(selectedFile);
      let downloadURL = "";


// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //this.pService.set((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  console.log('Upload is ' + this.progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  downloadURL = uploadTask.snapshot.downloadURL;
  //console.log(downloadURL);
  //
});

uploadTask.then((snapshot)=>{
        let image = {
          name:selectedFile.name,
          path:path,
          propid:data.id,
          stateid:this.count
        }
        //console.log(image);
        data.GSTDatas[this.count]["Imagename"]= selectedFile.name;
        data.GSTDatas[this.count]["Imagepath"]= downloadURL;
        this.count = this.count+1;
        //console.log(downloadURL);

        this.mydata.update(key,data);
        //if(this.count== data.GSTDatas.length-1){
          this.pService.done();
        //}
        return this.images.push(image);
      });

    }
    }

  }


addIdea(key,data){
    //this.mydata.update(key,data);
    this.count = 0;

    //update images
    let storageRef = firebase.storage().ref();

    let files = [(<HTMLInputElement>document.getElementById('image')).files];
    let random = Math.floor(Math.random() * 500) + 1  ;
    for(var i=0;i<files[0].length;i++){
      let selectedFile = files[0][i];
      let path = `/${this.folder}/${random}${selectedFile.name}`;
      let iRef = storageRef.child(path);
      this.pService.start();
      let uploadTask = iRef.put(selectedFile);
      let downloadURL = "";


// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //this.pService.set((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  console.log('Upload is ' + this.progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  downloadURL = uploadTask.snapshot.downloadURL;

});

uploadTask.then((snapshot)=>{
        
        data.IdeaAttachmentName= selectedFile.name;
        data.IdeaAttachmentLink= downloadURL;
        var key = this.ideadata.push(data).then((item) => { 
          //console.log("key "+key);
          //console.log(getManager(data.id));
          this.addIdeaToUser(item.key) ;
          this.addIdeaToAdmin(item.key);
          //this.addIdeaToUser("") ;
          
          //this.addIdeaToManagerTest(item.key);
        });
        //this.ideadata.update(key,data);
          this.gotoideaslist();
          this.pService.done();
          

        return ;
      });

    }
  }


gotoideaslist(){
  this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/ideas-list/'+auth.auth.uid);
      } 
    });
}

editIdea(key,data){
    //this.mydata.update(key,data);
    this.count = 0;

    //update images
    let storageRef = firebase.storage().ref();

    let files = [(<HTMLInputElement>document.getElementById('image2')).files];
    let random = Math.floor(Math.random() * 500) + 1  ;
    for(var i=0;i<files[0].length;i++){
      let selectedFile = files[0][i];
      let path = `/${this.folder}/${random}${selectedFile.name}`;
      let iRef = storageRef.child(path);
      this.pService.start();
      let uploadTask = iRef.put(selectedFile);
      let downloadURL = "";


// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //this.pService.set((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  console.log('Upload is ' + this.progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  downloadURL = uploadTask.snapshot.downloadURL;

});

uploadTask.then((snapshot)=>{
        
        data.IdeaAttachmentName= selectedFile.name;
        data.IdeaAttachmentLink= downloadURL;
        this.ideadata.update(key,data);
       // console.log(key);

          this.pService.done();

        return ;
      });

    }
  }

editIdea2(key,data){
  this.ideadata.update(key,data);
  return;
}

  addIdeaToManager(managerkey,ideakey){
    
  }

  addIdeaToAdmin(ideakey){
    let url = '/myusers/3bHlZrSYN6afukcNNsXDXrUq7NQ2/ideas';
    this.af.database.list(url).push({ideakey : ideakey});//3bHlZrSYN6afukcNNsXDXrUq7NQ2
  }

  addIdeaToUser(ideakey){
    let url = '/myusers/'+this.af.auth.getAuth().uid+'/ideas';
    this.af.database.list(url).push({ideakey : ideakey});//3bHlZrSYN6afukcNNsXDXrUq7NQ2
  }
  addIdeaToManagerTest(ideakey){
    let url = '/myusers/'+this.af.auth.getAuth().uid+'/subordinateideas/'+ideakey;//ideaskey replace with subordinate uid
    this.af.database.list(url).push({ideakey : ideakey});
  }

  
}

interface Listing{
    $key?:string;
    $title?:string;
    type?:string;
    image?:string;
    city?:string;
    owner?:string;
    bedrooms?:string;
}

interface MyData{
    $key?:string;
    $CustomerName?:string;
    Address?:string;
    PinCode?:string;
    Location?:string;
    State?:string;
    PhoneNo?:string;
    MobileNo?:string;
    Email?:string;
    Pan?:string;
}

interface MyUsers{
    $key?:string;
    $Email?:string;
    Password?:string;
    MyAuthid?:string;
}

interface Data{
    $key?:string;
    $CustomerName?:string;
    Address?:string;
    PinCode?:string;
    Location?:string;
    State?:string;
    PhoneNo?:string;
    MobileNo?:string;
    Email?:string;
    Pan?:string;
    CustomerCode?:string;
    Vat?:string;
		Ecc?:string;
    Cst?:string;
    GSTDatas?:GSTData[];
    OptionSelected?:string;
    Stateitems?: string[];
    Stateitemshidden?: boolean[];

		
}

interface Image{
    $key?:string;
    name?:string;
    path?:string;
    stateid?:string;
}

interface GSTData{
    ContactPersonForGST?:string;
		ContactNumberForGST?:string;
    ContactEmailForGST ?:string;
		ProvisionalGSTNumber?:string;
		GSTARN?:string;
		HSNCode?:string;
		ServiceAccountingNumber?:string;
    GSTState?:string;
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

interface IdeasIdeaDataAdmin{
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
  
}