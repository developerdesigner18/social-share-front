import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { DialogEditSuccessComponent } from '../dialog-edit-success/dialog-edit-success.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  isSubmitted = false;

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
      city: [data.city],
      hobbies: [data.hobbies]
    })
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
