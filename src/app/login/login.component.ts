import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from  '@angular/material/dialog';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    error: {};
    loginError: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router,
    public dialog:  MatDialog
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authService.logout();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.submitted = true;
    this.authService.login(this.email.value, this.password.value).subscribe((data) => {
       if (this.authService.isLoggedIn) {
          // this.dialog.closeAll();
          console.log('data id', data);
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/profile';
          this.router.navigate([redirect]);
        }
      }
    );
    // if (this.authService.isLoggedIn() !== true) {
    //   this.loginForm.reset()
    //   this.submitted = false;
    //   this.dialog.open(DialogErrorComponent, {
    //     width: '420px'
    //   })
    // }
  }
}
