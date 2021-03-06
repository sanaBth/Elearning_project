import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'app/model/commande';
import { Formation } from 'app/model/formation';
import { Panier } from 'app/model/panier';
import { User } from 'app/model/user';
import { FormationDbService } from 'app/service/formation-db.service';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';
import { ToastService } from 'app/service/toast.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  environment = environment;
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
  listcours: any
  oneformation: []
  listpanier: Panier[]
  mescours: any[] = []
  buttontrue: boolean = true
  constructor(private formationservice: FormationDbService,
    private storageService: LocalstorageService,
    private router: Router, public toastService: ToastService, private userservice: LearningDbService) { }

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
  displayButton(idf: string) {
    this.userId = this.storageService.getUseId()

    if (this.userId) {
      this.mescours = this.storageService.getCoursid()
      if (this.mescours.filter(item => item == idf).length != 0) {
        return !this.buttontrue;

      } else {
        return this.buttontrue;
      }
    } else {
      return this.buttontrue;
    }

  }
  addtoCart(oneformation: Formation, idformation: string) {

    this.panier = this.storageService.getPanier();
    this.onRefresh();
    if (this.panier.length != 0) {
      if ((this.panier.find(item => item._id === idformation)) === undefined) {
        this.storageService.storeOnpanier(oneformation);
        this.toastService.show('Votre formation a ??t?? ajout??e au panier avec succ??!', { classname: 'bg-success text-white font-weight-bold px-2 py-1', delay: 3000 });
        this.onRefresh();
      }
      else {
        this.toastService.show('Vous avez d??j?? command??e cet formation!', { classname: 'bg-warning text-white font-weight-bold px-2 py-1', delay: 2000 });
        this.onRefresh()
      }
    }
    else {
      this.storageService.storeOnpanier(oneformation);
      this.toastService.show('Votre formation a ??t?? ajout??e au panier avec succ??!', { classname: 'bg-success text-white font-weight-bold px-2 py-1', delay: 3000 });
      this.onRefresh()
    }
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
