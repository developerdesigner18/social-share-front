import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public  dialog:  MatDialog
  ) {
    this.registerForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      uname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  get formControls() { return this.registerForm.controls }

  registerUser() {
    this.isSubmitted = true;
    if(!this.registerForm.valid){
      return;
    }
    this.authService.register(this.registerForm.value).subscribe((res) => {
     if (!res.result) {
       this.registerForm.reset()
       this.dialog.open(DialogBodyComponent, {
         width: '350px'
       })
       this.isSubmitted = false;
     }
   })
  }
}
