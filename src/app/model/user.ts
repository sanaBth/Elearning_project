

export class User {
    username:string;
    email:string;
    password:string;
    role:Boolean;
  
    constructor(username :string,email : string,password:string, role:Boolean)
    {
        this.username=username;
        this.email=email;
        this.password=password;
        this.role=role;
    }
}