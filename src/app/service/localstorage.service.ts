import { Injectable } from '@angular/core';
import { Formation } from 'app/model/formation';
import { Panier } from 'app/model/panier';
import { User } from 'app/model/user';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  public users: User;
  constructor() { }
  panier = Panier
  public lespaniers: Formation[]
  taille: number
  setUseconnected(user: any) {
    localStorage.setItem('userconnected', JSON.stringify(user.username,));
    localStorage.setItem('role', JSON.stringify(user.role));
    localStorage.setItem('email', JSON.stringify(user.email));
    localStorage.setItem('userid', JSON.stringify(user._id));
    localStorage.setItem('coursId', JSON.stringify(user.cours));
  }
  getUseconnected() {
    return JSON.parse(localStorage.getItem('userconnected') || 'null');
  }

  getCoursid() {
    return JSON.parse(localStorage.getItem('coursId') || 'null');
  }
  getUseId() {
    return JSON.parse(localStorage.getItem('userid') || 'null');
  }

  public logout() {
    localStorage.removeItem('userconnected')
    localStorage.removeItem('userid')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
  }

  gettoken() {
    return JSON.parse(localStorage.getItem('token') || 'null')
  }

  settoken(token: any) {
    localStorage.setItem('token', JSON.stringify(token.token));
  }
  setuserId(token: any) {
    localStorage.setItem('userId', JSON.stringify(token.userId));
  }

  public storeOnpanier(formation: Formation): void {

    // get array of tasks from local storage
    this.lespaniers = JSON.parse(localStorage.getItem('Panier') || '[]');
    // push new task to array
    this.lespaniers.push(formation);
    // insert updated array to local storage
    localStorage.setItem('Panier', JSON.stringify(this.lespaniers));

  }

  removePanier() {
    localStorage.removeItem('Panier')
  }
  getPanier() {
    /* const posts = JSON.parse(localStorage.getItem('Posts')) || [];*/
    return JSON.parse(localStorage.getItem('Panier') || '[]');

  }
  lengthPanier() {
    this.panier = this.getPanier();
    this.taille = this.getPanier().length;
    return this.taille;
  }

  deleteformation(i: number) {

    this.lespaniers = JSON.parse(localStorage.getItem('Panier') || '[]');
    this.lespaniers.splice(i, 1)
    localStorage.setItem('Panier', JSON.stringify(this.lespaniers));

  }
}
