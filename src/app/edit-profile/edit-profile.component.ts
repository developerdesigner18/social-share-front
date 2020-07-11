import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DialogEditSuccessComponent } from '../dialog-edit-success/dialog-edit-success.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  isSubmitted = false;
  state = [];
  isEnabled = false;

  countryList: Array<any> = [
    { name: 'Canada', states: ['Ontario', 'Alberta', 'Quebec', 'Nova Scotia', 'New Brunswick'] },
    { name: 'India', states: ['Gujarat', 'Maharashtra', 'Rajasthan','Punjab'] }
  ];

  stateList: Array<any> = [
    { states: 'Ontario', cities: ['Toronto','Hearst','Ottawa','Hamilton','London'] },
    { states: 'Alberta', cities: ['Calgary','Edmonton','Lethbridge','Red Deer'] },
    { states: 'Quebec', cities: ['Montreal','Gatineau','Sherbrooke','Levis'] },
    { states: 'Nova Scotia', cities: ['Sydney','Amherst','Truro','Yarmouth'] },
    { states: 'New Brunswick', cities: ['Bathurst','Dieppe','Edmundston','Miramichi'] },
    { states: 'Gujarat', cities: ['Surat','Ahmedabad','Vadodara','Rajkot'] },
    { states: 'Maharashtra', cities: ['Mumbai','Pune','Nagpur'] }
  ]

  constructor(
    private  dialogRef:  MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public  data:  any,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public  dialog:  MatDialog
  ) {
    this.profileForm = this.formBuilder.group({
      userId: window.location.href.split('/')[4],
      designation: [data.postition],
      country: [data.country],
      state: [data.state],
      city: [data.city],
      hobbies: [data.hobbies]
    })

    // console.log("+-=-=----==")
    // console.log(data.country == '')
    // if(data.country == ''){
    //   country = 0;
    // }
    // console.log("+-=-=----==")
  }


  cities: Array<any>;
  states: Array<any>;
  changeCountry(count: any) {
    // if(this.countryList.find(con => con.name == this.data.country).name == this.data.country)
    // {
    //   console.log('True set')
    //   this.isEnabled = true
    // }
    // this.cities = this.countryList.find(con => con.name == count).cities;
    this.states = this.countryList.find(con => con.name == count).states;
  }

  changeState(count) {

    this.cities = this.stateList.find(con => con.states == count).cities;
    // this.states = this.countryList.find(con => con.name == count).states;
  }

  get formControls() { return this.profileForm.controls }

  ngOnInit(): void {
  }

  updateProfile() {
   let hobby = this.profileForm.value.hobbies.split(',').map(item => item.trim());
   this.profileForm.value.hobbies = hobby;
    this.authService.profileUpdate(this.profileForm.value).subscribe((res) => {
     if (!res.result) {
       this.dialogRef.close();
       this.dialog.open(DialogEditSuccessComponent, {
         width: '400px'
       })
     }
   })
  }

  close() {
    this.dialogRef.close();
  }

  save(){
    setTimeout(() => {
     this.dialogRef.close();
     window.location.replace('profile/' + window.location.href.split('/')[4]);
   }, 2000);
  }
}
