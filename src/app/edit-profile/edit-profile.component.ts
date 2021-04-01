import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DialogEditSuccessComponent } from '../dialog-edit-success/dialog-edit-success.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  isSubmitted = false;
  state = [];
  isEnabled = false;
  selectedValue = 0;

  countryList: Array<any> = [
    // { name: 'Canada', states: ['Alberta','British Columbia','Manitoba','New Brunswick','Newfoundland and Labrador', 'Nova Scotia', 'Ontario','Prince Edward Island','Quebec','Saskatchewan','Northwest Territories','Nunavut','Yukon'] }
  ];

  stateList: Array<any> = [
    // { states: 'Alberta', cities: ['Calgary','Edmonton','Lethbridge','Red Deer'] },
    // { states: 'British Columbia', cities: ['Vancouver','Victoria','Kelowna','Surrey'] },
    // { states: 'Manitoba', cities: ['Winnipeg','Brandon','Morden','Steinbach'] },
    // { states: 'New Brunswick', cities: ['Bathurst','Dieppe','Edmundston','Miramichi'] },
    // { states: 'Newfoundland and Labrador', cities: ['Labrador City','Gander','Corner Brook','Mount Pearl','Deer Lake'] },
    // { states: 'Nova Scotia', cities: ['Sydney','Amherst','Truro','Yarmouth'] },
    // { states: 'Ontario', cities: ['Toronto','Hearst','Ottawa','Hamilton','London','Kapuskasing','Timmins','Cochrane','North Bay','Thunder Bay','Sudbury','Ottawa','Brockville','White river','Hornepayne','Sault Ste. Marie','Wawa','Dubreuilville','Chapleau','New Liskeard','Smooth rock falls'] },
    // { states: 'Prince Edward Island', cities: ['Charlottetown','Summerside','Souris','Alberton','Kensington'] },
    // { states: 'Quebec', cities: ['Montreal','Gatineau','Sherbrooke','Levis'] },
    // { states: 'Saskatchewan', cities: ['Regina','Saskatoon','Prince Albert','Moose Jaw'] },
    // { states: 'Northwest Territories', cities: ['Yellowknife','Fort Simposn','Norman Wells','Tuktoyaktuk'] },
    // { states: 'Nunavut', cities: ['Iqaluit','Rankin Inlet','Pangnirtung','Pound Inlet'] },
    // { states: 'Yukon', cities: ['Dawson City','Whitehourse','Carcross','Teslin'] }
  ]

  constructor(
    private  dialogRef:  MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public  data:  any,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {
    this.profileForm = this.formBuilder.group({
      userId: window.location.href.split('/')[4],
      designation: [data.postition],
      country: [data.country],
      state: [data.state],
      city: [data.city],
      hobbies: [data.hobbies]
    })
  }


  cities: Array<any>;
  states: Array<any>;
  changeCountry(count: any) {
    this.states = this.countryList.find(con => con.name == count).states;
  }

  changeState(count) {

    this.cities = this.stateList.find(con => con.states == count).cities;
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
       this.toastr.success("Your profile has been saved successfully.")
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
