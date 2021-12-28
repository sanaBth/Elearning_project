import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'app/model/commande';
import { Panier } from 'app/model/panier';
import { CartService } from 'app/service/cart.service';
import { LocalstorageService } from 'app/service/localstorage.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
panier = Panier
id : any
somme : Number = 0;
userId:string
idformationpanier :string[]= [];
 cmd = new Commande('',[],0);

  sommePanier:Number
  constructor(private storageService :LocalstorageService ,
    private router: Router,
    private cartService : CartService
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
  sommeTotal()
  {
    this.panier = this.storageService.getPanier();
    //console.log(this.panier);
    for(let i=0; i< this.panier.length;i++)
    {
       this.somme = this.panier[i].prix + this.somme
    }
  }
  refresh ()
  {
    this.panier = this.storageService.getPanier();

  }
  delete(i:number)
  {
    this.storageService.deleteformation(i);
    this.refresh()
    this.onRefresh()
  }
  passerCommande(p:Panier, sommePanier :Number) 
  {
   // console.log(this.storageService.lengthPanier());
    if(this.storageService.lengthPanier() == 0) 
    {
      //toast
      console.log("veullez ajouter au panier d'abord!");
    }else
    {
       if (this.storageService.getUseconnected())
    {
      for (let i=0; i < p.length; i++)
      {
       
        this.id =p[i]._id
        console.log(this.id);
       this.idformationpanier.push(this.id)
     
      }
      //affichage popup commande éffectué 
      this.userId = this.storageService.getUseId()
     console.log(this.userId);  
  
      this.cmd.iduser = this.userId

     this.cmd.sommetotal = sommePanier
     this.cmd.idformation = this.idformationpanier 
    
        this.cartService.addTocommande(this.userId,this.cmd).subscribe(
        (res)=>{
          console.log(res);
        // this.router.navigate(['/formation']);
        },
        (err)=>{console.log(err);
        //notification error
      }
      ); 

      this.storageService.removePanier();
    }
    else
    {
      console.log("false");
      this.router.navigate(['/login'])
    }
   }
  }
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key:
        'pk_test_51K9or8Jt4jQVeR1yWW6JNvzFHAN5pb10KULVFwhyHQQed40cFg7zv2IODDRp2Q3crnEiUpRjFk06FWYeP8otCJ7P00Ah7kZDlm',

      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken.card);
        alert('Stripe token generated!');
      },
    });

    paymentHandler.open({
      name: 'Technical Adda',
      description: '4 Products Added',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}
