import { Formation } from "./formation";

export class Panier {
    idformation :Formation[];
  length: number;
    constructor(idformation :[])
    {
        this.idformation=idformation;
    }
}
