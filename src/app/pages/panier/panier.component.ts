import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'app/model/commande';
import { Panier } from 'app/model/panier';
import { CartService } from 'app/service/cart.service';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';
import { ToastService } from 'app/service/toast.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  panier = Panier
  id: any
  somme: Number = 0;
  userId: string
  idformationpanier: string[] = [];
  cmd = new Commande('', [], 0);

  sommePanier: Number
  constructor(private storageService: LocalstorageService,
    private router: Router,
    private cartService: CartService, public toastService: ToastService,
    private userservice: LearningDbService,
  ) { }

  ngOnInit(): void {

    this.invokeStripe();
    this.refresh();
    this.sommeTotal();
  }
  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
  sommeTotal() {
    this.panier = this.storageService.getPanier();
    //console.log(this.panier);
    for (let i = 0; i < this.panier.length; i++) {
      this.somme = this.panier[i].prix + this.somme
    }
  }
  refresh() {
    this.panier = this.storageService.getPanier();

  }
  delete(i: number) {
    this.storageService.deleteformation(i);
    this.refresh()
    this.onRefresh()
    this.toastService.show('Votre formation a été supprimée du panier avec succé!', { classname: 'bg-success text-white font-weight-bold px-2 py-1', delay: 3000 });

  }
  passerCommande(p: Panier, sommePanier: any) {
    // console.log(this.storageService.lengthPanier());
    if (this.storageService.lengthPanier() == 0) {
      this.toastService.show("Veuillez ajouter au panier d'abord!", { classname: 'bg-warning text-white font-weight-bold px-2 py-1', delay: 2000 });

    } else {
      if (this.storageService.getUseconnected()) {
        for (let i = 0; i < p.length; i++) {
          this.id = p[i]._id
          this.idformationpanier.push(this.id)
        }
        //affichage popup commande éffectué 
        this.userId = this.storageService.getUseId()
        this.cmd.iduser = this.userId
        this.cmd.sommetotal = sommePanier
        this.cmd.idformation = this.idformationpanier

        //add to commande
        this.cartService.addTocommande(this.userId, this.cmd).subscribe(
          (res) => {
            console.log(res);
            // this.router.navigate(['/formation']);
          },
          (err) => {
            console.log(err);
            //notification error
          }
        );


        var k = this.storageService;
        var toast = this.toastService;
        var monpanier = this.panier

        ///payment stripe
        const paymentHandler = (<any>window).StripeCheckout.configure({
          key:
            'pk_test_51K9or8Jt4jQVeR1yWW6JNvzFHAN5pb10KULVFwhyHQQed40cFg7zv2IODDRp2Q3crnEiUpRjFk06FWYeP8otCJ7P00Ah7kZDlm',

          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken.card);
            //  k.removePanier()
            toast.show("Votre paiement a été éffectué avec succé!", { classname: 'bg-succes text-white font-weight-bold px-2 py-1', delay: 2000 })
            //    console.log(this.this.panier);
          },
        }
        );
        paymentHandler.open({
          name: 'Paiement en ligne',
          //description: '4 Products Added',
          amount: sommePanier * 100,
        });
        ///
        // this.storageService.removePanier();
      }
      else {
        this.toastService.show("Veuillez se connecter!", { classname: 'bg-warning text-white font-weight-bold px-2 py-1', delay: 2000 });

        this.router.navigate(['/login'])
      }
    }
  }

  makePayment() {

  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
      console.log('test0');
    }
    console.log('test1');
  }
}
