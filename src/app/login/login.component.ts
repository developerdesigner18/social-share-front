import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

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
    public router: Router
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
          const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/profile/1';
          this.router.navigate([redirect]);
        } else {
          // this.loginError = 'Email or password is incorrect.';
          console.log('Error login message');
          // alert('Users successfully created')
          // this.showMsg= true;
          // this.msg = 'success';
        }
      },
      error => this.error = error
    );
  }
}
