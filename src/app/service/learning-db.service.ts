import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'app/model/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LearningDbService {

  api_url: string = 'https://learningapi20.herokuapp.com';

  constructor(private httpClient: HttpClient, public router: Router) { }

  // Sign-in
  login(user: User) {
    return this.httpClient.post<any>(`${this.api_url}/apiuser/login`, user);

  }
  //register
  register(user: User) {
    return this.httpClient.post(`${this.api_url}/apiuser/register`, user);
  }
  //send mail forgot password
  forgotPassword(email: string) {
    return this.httpClient.post(`${this.api_url}/apiuser/forgot`, email);
  }

  //reset password
  resetpassword(id: string, token: string, password: string) {
    return this.httpClient.post(`${this.api_url}/apiuser/${id}/${token}`, { password });
  }

  //get my profil
  getprofil(id: string) {
    return this.httpClient.get(`${this.api_url}/apiuser/details/${id}`)/* .pipe(
      catchError(this.handleError)
    ) */
  }

  //get all users all users
  getusers() {
    return this.httpClient.get(`${this.api_url}/apiuser/allusers`);
  }

  //change role user to true
  updateUser(id: string) {
    return this.httpClient.put(`${this.api_url}/apiuser/role/${id}`, null).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
