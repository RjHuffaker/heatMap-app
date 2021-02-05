import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService, HeatMarkerService, MessageService } from '@/_services';

@Component({templateUrl: 'user-login.component.html'})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  loginFailed = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authenticationService: AuthenticationService,
    public heatMarkerService: HeatMarkerService,
    public messageService: MessageService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) { 
      this.router.navigate(['/user/profile']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user/profile';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.loading = false;
      console.log("login form invalid");
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        res => {
          this.router.navigate([this.returnUrl]);
          this.messageService.add('Login Successful!! '+res);
          this.messageService.add(res);
        },
        err => {
          console.log("login failed!!!!!!", err);
          this.messageService.add('Login Failed!! '+err);
          this.loading = false;
          this.loginFailed = true;
        });
    


  }
}