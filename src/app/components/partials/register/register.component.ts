import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isSubmitted = false;

  constructor(private _fb: FormBuilder, private _userService: UserService) {}
  
  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get fc() {
    return this.registerForm.controls
  }

  submit() {
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;
    this._userService.registerNewUser(this.registerForm.value).subscribe((resp: any) => {
      console.log("register sucessfull");
    })
    
  }

}
