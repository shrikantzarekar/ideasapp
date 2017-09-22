import {Component,OnInit} from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import * as firebase from 'firebase';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
    selector: 'app-edit-listing',
    templateUrl: './edit-listing.component.html',
    styleUrls: ['./edit-listing.component.css']
})

export class EditListingComponent implements OnInit {

    items: number[];
    stateitems: string[];
    stateitemshidden: boolean[];
    count: any;
    showaddbutton: boolean;
    optionSelected: any;

    listing: any;
    title: any;
    owner: any;
    bedrooms: any;
    price: any;
    type: any;
    city: any;
    id: any;
    data: any;
    customerName: any;
    address: any;
    pinCode: any;
    location: any;
    state: any;
    phoneNo: any;
    mobileNo: any;
    email: any;
    pan: any;
    customerCode: any;
    contactEmailForGST: any;
    image: any;

    vat: any;
    ecc: any;
    cst: any;

    gSTDatas: any;
    contactPersonForGST: any;
    contactNumberForGST: any;
    provisionalGSTNumber: any;
    gSTARN: any;
    hSNCode: any;
    serviceAccountingNumber: any;

    lala: any;

    constructor(
        private firebaseService: FirebaseService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService
    ) {}

    ngOnInit() {
		this.stateitems =[];
		this.stateitemshidden=[];
        this.showaddbutton = true;
        this.optionSelected = "1";
        this.count = 0;
        this.items = [0];
        this.gSTDatas = [];
        this.id = this.route.snapshot.params['id'];
        this.firebaseService.getDataDetails(this.id).subscribe(data => {
            this.data = data;
            this.id = this.data.$key;
            this.customerName = this.data.CustomerName;
            this.address = this.data.Address;
            this.pinCode = this.data.PinCode;
            this.location = this.data.Location;
            this.state = this.data.State;
            this.phoneNo = this.data.PhoneNo;
            this.mobileNo = this.data.MobileNo;
            this.email = this.data.Email;
            this.pan = this.data.Pan;
            this.customerCode = this.data.CustomerCode;

            this.vat = this.data.Vat;
            this.ecc = this.data.Ecc;
            this.cst = this.data.Cst;
            this.optionSelected = this.data.OptionSelected;
            this.stateitems = this.data.Stateitems;
            this.stateitemshidden = this.data.Stateitemshidden;

            this.gSTDatas = this.data.GSTDatas;
            if (this.optionSelected != "2") {
                this.showaddbutton = false;
            }

        });

        //console.log(this.gSTDatas);

    }

    onEditSubmit() {
        if (this.optionSelected == "2") {
            this.gSTDatas = null;
			this.stateitems = null;
			this.stateitemshidden = null;
        }
        let data = {
            id: this.id,
            CustomerName: this.customerName,
            Address: this.address,
            PinCode: this.pinCode,
            Location: this.location,
            State: this.state,
            PhoneNo: this.phoneNo,
            MobileNo: this.mobileNo,
            Email: this.email,
            Pan: this.pan,
            CustomerCode: this.customerCode,

            Vat: this.vat,
            Ecc: this.ecc,
            Cst: this.cst,

            OptionSelected: this.optionSelected,
            Stateitems: this.stateitems,
            Stateitemshidden: this.stateitemshidden,
            GSTDatas: this.gSTDatas

        }
        this.firebaseService.editDataListing(this.id, data);
        this.flashMessage.show('Thank you ' + this.customerName + ' for update!', {
            cssClass: 'alert-success',
            timeout: 6000
        });
        //this.router.navigate(['thankyou']);
    }

    createRange2() {
        //var items: number[] = [];
        this.count = this.count + 1;
        this.items.push(this.count);
        console.log(this.items);
        return this.items;
    }

    createRange() {
        //var items: number[] = [];
        if (!this.showaddbutton) {
            this.showaddbutton = false;
        }
        var mynewpoint = {
            ContactPersonForGST: "",
            ContactNumberForGST: "",
            ContactEmailForGST: "",
            ProvisionalGSTNumber: "",
            GSTARN: "",
            HSNCode: "",
            ServiceAccountingNumber: "",
            GSTState: ""
        };


        if (typeof this.gSTDatas != 'undefined') {

            this.gSTDatas.push(mynewpoint);
            //console.log(this.items);
            //console.log(this.gSTDatas.length);
            this.count = this.gSTDatas.length - 1;
            this.items.push(this.count);
            console.log(this.gSTDatas);

            return this.items;
        } else {

            //this.stateitems = ["Maharashtra", "Tamil Nadu", "Kashmir"];
            this.stateitems = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
   "Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh",
   "Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
   "Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Pondicherry","Rajasthan","Sikkim","Tamil Nadu","Telangana",
   "Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
            this.stateitemshidden = [false, false, false];
            //this.Stateitems = this.stateitems;
            //this.Stateitemshidden = this.stateitemshidden;
            console.log(this.stateitems);

            this.gSTDatas = [mynewpoint];
            this.count = this.gSTDatas.length - 1;
            this.items.push(this.count);
            console.log(this.gSTDatas);
            return this.items;
        }
        //console.log(this.gSTDatas);

    }

    showButton(option) {
        this.showaddbutton = false;
        this.optionSelected = option.toString();
        var mynewpoint = {
            ContactPersonForGST: "",
            ContactNumberForGST: "",
            ContactEmailForGST: "",
            ProvisionalGSTNumber: "",
            GSTARN: "",
            HSNCode: "",
            ServiceAccountingNumber: "",
            GSTState: ""
        };
		console.log(this.showaddbutton);

        if (typeof this.gSTDatas != 'undefined') {
            return this.items;
        } else {
			//this.stateitems = ["Maharashtra", "Tamil Nadu", "Kashmir"];
            this.stateitems = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
   "Chandigarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh",
   "Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
   "Meghalaya","Mizoram","Nagaland","Orissa","Punjab","Pondicherry","Rajasthan","Sikkim","Tamil Nadu",
   ,"Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
            this.stateitemshidden = [false, false, false];
            this.gSTDatas = [mynewpoint];
            this.count = this.gSTDatas.length - 1;
            this.items.push(this.count);
            console.log(this.gSTDatas);

            return this.items;
        }
    }


    setState(value, index) {
        this.gSTDatas[index].GSTState = value;
		var index2=0;
		while(this.stateitems[index2]!=value){
			index2++;
		}
        this.stateitemshidden[index2] = true;
        console.log(this.stateitemshidden);
    }


    hideButton(option) {
        this.showaddbutton = true;
        this.optionSelected = option.toString();
    }

    closePanel(i) {
        if (i > -1) {
			var index2=0;
			while(this.stateitems[index2]!=this.gSTDatas[i].GSTState && index2<40){
				index2++;
			}
			this.stateitemshidden[index2] = false;
            this.gSTDatas.splice(i, 1);
        }
    }

    trackByIndex(index: number, obj: any): any {

        return index;
    }


}