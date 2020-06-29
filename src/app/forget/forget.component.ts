import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from  '@angular/material/dialog';
import { DialogForgetComponent } from '../dialog-forget/dialog-forget.component';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  forgetForm: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public  dialog:  MatDialog
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
     if (!res.result) {
       this.forgetForm.reset()
       // alert('successfully send')
       this.dialog.open(DialogForgetComponent, {
         width: '650px'
       })
     }
     this.isSubmitted = false;
   })

  }

}
