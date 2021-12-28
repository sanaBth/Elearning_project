export class Commande {
    iduser : string;
    idformation : string[];
    sommetotal : Number;
    constructor(iduser :string,  idformation :string[] ,sommetotal :Number)
    {
        this.iduser=iduser;
        this.sommetotal=sommetotal;
        this.idformation=idformation;
    }
   
}






