import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from  '@angular/material/dialog';
import { DialogForgetComponent } from '../dialog-forget/dialog-forget.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent implements OnInit {
  forgetForm: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    public toastr: ToastrService
  ) {
    this.forgetForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  get formControls() { return this.forgetForm.controls }

  forgetUser(){
    this.isSubmitted = true;
    if(!this.forgetForm.valid){
      return;
    }
    this.authService.forget(this.forgetForm.value).subscribe((res) => {      
     if (res.success) {
       this.forgetForm.reset()
       this.toastr.info("We've sent a password reset link to your mail inbox. Please use it get your account back.")
     } else if (!res.success) {
       this.toastr.error("This E-mail address was not found in our system.")
     }
     this.isSubmitted = false;
   })

  }

}
