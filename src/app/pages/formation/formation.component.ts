import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'app/model/commande';
import { Formation } from 'app/model/formation';
import { Panier } from 'app/model/panier';
import { User } from 'app/model/user';
import { FormationDbService } from 'app/service/formation-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';
import { ToastService } from 'app/service/toast.service';


@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  formation: []
  newformation: []
  filterargs: string
  detailsformation: any
  filtredInput: String = "";
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  userconnected: User;
  userId: string
  commande: Commande
  role: User
  panier: any
  oneformation: []
  listpanier: Panier[]
  constructor(private formationservice: FormationDbService,
    private storageService: LocalstorageService,
    private router: Router, public toastService: ToastService) { }

  ngOnInit(): void {
    this.refresh();
    this.userconnected = JSON.parse(localStorage.getItem('userconnected') || 'null')
    this.userId = JSON.parse(localStorage.getItem('userid') || 'null')
    this.role = JSON.parse(localStorage.getItem('role') || 'null')
  }
  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
  addtoCart(oneformation: Formation, idformation: string) {
    this.panier = this.storageService.getPanier();
    //console.log(this.panier);
    if (this.panier.length != 0) {
      this.onRefresh()
      //console.log("panier plein");
      if ((this.panier.find(item => item._id === idformation)) === undefined) {
        this.storageService.storeOnpanier(oneformation)
        this.onRefresh()
        this.toastService.show('Votre formation a été ajoutée au panier avec succé!', { classname: 'bg-success text-white font-weight-bold px-2 py-1', delay: 3000 });
      }
      else {
        this.toastService.show('Vous avez déjà commandée cet formation!', { classname: 'bg-warning text-white font-weight-bold px-2 py-1', delay: 2000 });

        this.onRefresh()
      }
    }
    else {
      // console.log("panier vide");
      this.storageService.storeOnpanier(oneformation);
      this.toastService.show('Votre formation a été ajoutée au panier avec succé!', { classname: 'bg-success text-white font-weight-bold px-2 py-1', delay: 3000 });
    }
  }
  showSuccess() {
    this.toastService.show('I am a success toast', { classname: 'bg-success text-white font-weight-bold px-2 py-1', delay: 4000 });

  }
  showStandard() {
    this.toastService.show('I am a standard toast', { classname: 'bg-danger text-white font-weight-bold px-2 py-1', delay: 4000 });
  }
  refresh() {
    return this.formationservice.getFormations().subscribe((data: any) => {
      this.formation = data;

    });
  }
  detailFormation(id: string) {
    this.router.navigate(['/formation', id]);
  }
  delformation(id: string) {
    this.formationservice.delFormation(id);
    this.refresh();
  }
  upformation(id: string) {
    this.router.navigate(['/addformation', id]);
  }
}
