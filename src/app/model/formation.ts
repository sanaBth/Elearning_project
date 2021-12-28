export class Formation {
    nom:string;
    imagef:string;
    dure:string;
    nomformateur:string;
    description:string;
    notes:number;
    prix :number;
    listVideo :[]
    id:string
    constructor(id:string,nom :string,imagef : string,dure:string,nomformateur:string,description:string,notes:number,
        prix :number,  listVideo :[])
    {
        this.id=id
        this.nom=nom;
        this.imagef=imagef;
        this.dure=dure;
        this.nomformateur=nomformateur;
        this.description=description;
        this.notes=notes;

this.prix=prix;
this.listVideo=listVideo;

        
    }
}