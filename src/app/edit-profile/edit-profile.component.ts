import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

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
    public  dialog:  MatDialog,
    private route: ActivatedRoute
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
    // this.isSubmitted = true;
   //  this.route.paramMap.subscribe(params => {
   //     this.userType = params.get("id")
   // })

   console.log('=-=-=-=-=-=-chek id');
   let hobby = this.profileForm.value.hobbies.split(',').map(item => item.trim());
   console.log('hobby',hobby);

   console.log('=-=-=-=-=-=-chek id');

   this.profileForm.value.hobbies = hobby;
    this.authService.profileUpdate(this.profileForm.value).subscribe((res) => {
     if (!res.result) {
       this.dialog.open(DialogBodyComponent, {
         width: '350px'
       })
       // this.isSubmitted = false;
     }
   })
  }

  close() {
    this.dialogRef.close();
  }

}
