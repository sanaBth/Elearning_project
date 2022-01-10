import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'app/model/formation';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { pipe, of, forkJoin } from 'rxjs/index';


@Injectable({
  providedIn: 'root'
})
export class FormationDbService {

  api_url: string = 'https://learningapi20.herokuapp.com';

  constructor(private httpClient: HttpClient, public router: Router) { }

  //get liste des formations
  getFormations() {
    return this.httpClient.get(`${this.api_url}/formation/getformation`);
  }

  //ajouter un formation
  addFormation(form: FormData): Observable<any> {
    return this.httpClient.post(`${this.api_url}/formation/add`, form).pipe(
      catchError(this.handleError)
    )
  }

  //ajouter un vidéo
  addVideo(form: FormData, id: string): Observable<any> {
    return this.httpClient.post(`${this.api_url}/video/add/${id}`, form).pipe(
      catchError(this.handleError)
    )
  }

  //get une formation avec liste video
  getOneformation(id: string) {
    return this.httpClient.get(`${this.api_url}/formation/details/${id}`)/* .pipe(
      catchError(this.handleError)
    ) */
  }

  //get une formation
  getOneformationwv(id: string) {
    return this.httpClient.get(`${this.api_url}/formation/detailv/${id}`)/* .pipe(
      catchError(this.handleError)
    ) */
  }
  //get une vidéo
  getOnevideo(id: string) {
    return this.httpClient.get(`${this.api_url}/video/details/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  //update video
  upvideo(form: FormData, id: string) {
    return this.httpClient.put(`${this.api_url}/video/update/${id}`, form)/* .pipe(
        catchError(this.handleError)
      ) */
  }

  //update formation
  upformation(form: FormData, id: string) {
    return this.httpClient.put(`${this.api_url}/formation/update/${id}`, form)/* .pipe(
      catchError(this.handleError)
    ) */
  }
  //delete une formation
  delFormation(id: string) {
    return this.httpClient.delete(`${this.api_url}/formation/delete/${id}`).subscribe(data => {
      console.log(data);
    });
  }

  //delete un video
  delvideo(id: string) {
    return this.httpClient.delete(`${this.api_url}/video/delete/${id}`).subscribe(data => {
      console.log(data);
    });
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
