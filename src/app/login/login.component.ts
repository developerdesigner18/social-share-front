import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from  '@angular/material/dialog';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from 'rxjs/operators';

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
  show:boolean;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router,
    public dialog: MatDialog,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService
      ) {
    this.show = false;
  }

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
    this.spinner.show();
    if(!this.loginForm.valid){
      this.toastr.error("Authentication is failed. Please check your email and password.")
      this.spinner.hide();
    }
    this.authService.login(this.email.value, this.password.value).pipe(finalize(() => { this.spinner.hide(); })).subscribe(() => {
      this.toastr.success("Welcome User in Social Share")
    });
    if (this.authService.isLoggedIn() !== true) {
      this.loginForm.reset();
      this.submitted = false;
    }
  }

  passShow(event: any){
    this.show = !this.show;
  }
}
