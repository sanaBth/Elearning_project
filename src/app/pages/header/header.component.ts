import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Panier } from 'app/model/panier';
import { User } from 'app/model/user';
import { LocalstorageService } from 'app/service/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  userconnected : User;
  role:User
  p:Number
  panier:Panier
  constructor(
      private storageService :LocalstorageService , 
      private router: Router) {
     
  }

  ngOnInit() {
  
      this.userconnected = JSON.parse(localStorage.getItem('userconnected') || 'null')
      this.role = JSON.parse(localStorage.getItem('role') || 'null')
 
      this.lenghtpanier();

  }
  lenghtpanier()
  {
    this.panier=this.storageService.getPanier();
  
    if (this.panier)
    {
       this.p=this.panier.length;
  
    }else
    {
       this.p = 0
    }
    //this.onRefresh();
    
  }
  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
  logout()
{
this.storageService.logout();
this.onRefresh();
}

}
