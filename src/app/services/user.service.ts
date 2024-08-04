import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/userInterface';
import { IUserRegister } from '../interfaces/registerInterface';
import { LOGIN_URL, REGISTER_URL } from '../constants/urls';
import { Observable, tap } from 'rxjs';
import { IUserLogin } from '../../../backend/src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  registerNewUser(register: IUserRegister): Observable<IUserRegister> {
    return this._http.post<IUserRegister>(REGISTER_URL, register).pipe(
      tap({
        next: (user) => {
          console.log("Successful login", user);
        },
        error: (err) => {
          console.log("Error:", err);
        }
      })
    )
  }

  loginUser(user: IUserLogin): Observable<IUserLogin> {
    return this._http.post<IUserLogin>(LOGIN_URL, user).pipe(
      tap({
        next: (user) => {
          console.log("User has sucessfully logged in", user)
        },
        error: (error) => console.log("An error has occured", error)
      })
    )
  }
}
