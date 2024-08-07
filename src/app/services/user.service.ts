import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/userInterface';
import { IUserRegister } from '../interfaces/registerInterface';
import { FOLLOW_URL, GET_EXISTING_USERS, LOGIN_URL, REGISTER_URL, UNFOLLOW_URL } from '../constants/urls';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { IUserLogin } from '../../../backend/src/models/user.model';

const USER_KEY = 'User'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<any | null>(this.getUserFromLocalStorage());
  public userObservable: Observable<any | null>;
  existingUsers!: any;

  constructor(private _http: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
    this.getExistingUsers().subscribe(resp => this.existingUsers = resp)
  }

  getCurrentUser(): any {
    console.log(this.userSubject.value);

    return this.userSubject.value;
  }

  registerNewUser(register: IUserRegister): Observable<IUserRegister> {
    return this._http.post<IUserRegister>(REGISTER_URL, register).pipe(
      tap({
        next: (user) => {
          console.log("Successful Rgister", user);

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
          this.userSubject.next(user);
          this.setUserToLocalStorage(user)
        },
        error: (error) => console.log("An error has occured", error)
      })
    )
  }
  logout() {
    this.userSubject.next(null); // Set user state to null on logout
    localStorage.removeItem(USER_KEY); // Remove item from local storage
    window.location.reload(); // Reload to update the UI
  }
  private setUserToLocalStorage(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): any | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as any;
    return null; // Return null if no user is found in local storage
  }

  getExistingUsers() {
    return this._http.get<any>(GET_EXISTING_USERS)
  }

  searchExisitingUser(input: string): Observable<any> {
    if (input) {
      return of(this.existingUsers?.filter((item: any) => item.name.toLowerCase().includes(input.toLowerCase())))
    }
    return of([])
  }

  follow(followId: string, userId: string): Observable<any> {
    return this._http.post<any>(FOLLOW_URL, { followId: followId, userId: userId }).pipe(
      tap({
        next: (user) => {
          console.log("followed :", user);
          // we need to update the localstorage as well
          const currentUser = this.getCurrentUser();
          currentUser.following.push(followId);
          this.setUserToLocalStorage(currentUser);
        },
        error: (err) => {
          console.log(err, "error in flloing");
        }
      })
    )
  }
  unfollow(followId: string, userId: string): Observable<any> {
    return this._http.post<any>(UNFOLLOW_URL, { followId: followId, userId: userId }).pipe(
      tap({
        next: (user) => {
          const currentUser = this.getCurrentUser();
          const index = currentUser.following.findIndex((item: any) => item._id === followId);
          if (index !== -1) {
            currentUser.following.splice(index, 1);
            this.setUserToLocalStorage(currentUser)
          }
        },
        error: (error) => {
          console.log("Error in Unfollowing user: ", error);

        }
      })
    )
  }

}
