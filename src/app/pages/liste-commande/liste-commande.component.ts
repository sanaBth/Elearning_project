import { Component, OnInit } from '@angular/core';
import { Commande } from 'app/model/commande';
import { AdministratorService } from 'app/service/administrator.service';
import { LocalstorageService } from 'app/service/localstorage.service';
@Component({
  selector: 'app-liste-commande',
  templateUrl: './liste-commande.component.html',
  styleUrls: ['./liste-commande.component.css']
})
export class ListeCommandeComponent implements OnInit {
  listcommande : Commande[]
  constructor(private storage : LocalstorageService, private adminservice : AdministratorService) { }

  ngOnInit(): void {
    this.getCommande();
  }
  getCommande()
  {
   
 return this.adminservice.getcommandes().subscribe((data:any) => {
  this.listcommande = data;
 //console.log(this.listcommande);
});
  
  }

}
