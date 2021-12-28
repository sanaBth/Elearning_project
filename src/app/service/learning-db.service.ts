import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'app/model/user';
@Injectable({
  providedIn: 'root'
})
export class LearningDbService {

  api_url: string = 'http://localhost:4000';
  
  constructor(private httpClient: HttpClient,public router: Router) { }

  // Sign-in
  login(user: User) {
    return this.httpClient.post<any>(`${this.api_url}/apiuser/login`, user);
    
  }
  //register
  register(user: User){
    return this.httpClient.post(`${this.api_url}/apiuser/register`, user);
  }
//send mail forgot password
  forgotPassword(email: string) {
    return this.httpClient.post(`${this.api_url}/apiuser/forgot`,  email );
}

//reset password
resetpassword(id:string,token:string,password:string)
{
  return this.httpClient.post(`${this.api_url}/apiuser/${id}/${token}`,  {password} );
}

}
