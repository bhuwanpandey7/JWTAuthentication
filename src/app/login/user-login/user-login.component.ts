import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.less']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;
  submitted = false;


  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.initLoginForm();
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['home']);
    } else {
      this.authenticationService.logout();
    }
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const user: User = this.getUserCredentials();
    this.authenticationService.login(user)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['home']);
        },
        () => {

        }
      );
  }

  private getUserCredentials(): User {
    return {
      UserName: this.loginForm.controls.userName.value,
      UserPassword: this.loginForm.controls.userPassword.value
    };
  }

  initLoginForm() {
    this.loginForm = new FormGroup(
      {
        userName: new FormControl('', Validators.required),
        userPassword: new FormControl('', Validators.required)
      }
    );
  }
}
