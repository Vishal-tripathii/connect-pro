import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;

  constructor(private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get fc() {
    return this.loginForm.controls
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    this._userService.loginUser({ email: this.fc.email.value, password: this.fc.password.value }).subscribe({
      next: (user) => {
        this._router.navigate(['/feed'])
      },
      error: (error) => {
        console.log("error in logging", error);
      }
    })
  }

}
