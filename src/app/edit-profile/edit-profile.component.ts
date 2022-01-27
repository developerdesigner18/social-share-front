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
  countryList: Array<any> = [];
  stateList: Array<any> = [];

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
      hobbies: [data.hobbies],
      intro: [data.intro]
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
     } else {
       this.toastr.error("Something is not right. Please try again some time later")
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
   }, 1000);
  }
}
