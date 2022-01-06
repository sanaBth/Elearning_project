import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'app/model/commande';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  api_url: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, public router: Router) { }

  //add to cart
  addTocommande(iduser: string, commande: Commande) {
    return this.httpClient.post(`${this.api_url}/commande/add/${iduser}`, commande).pipe(
      catchError(this.handleError)
    )
  }
  //add formation to users
  addToUser(iduser: string, idform: string[]) {
    return this.httpClient.put(`${this.api_url}/apiuser/user/${iduser}/${idform}`, null).pipe(
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
