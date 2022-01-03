

export class User {
    username: string;
    email: string;
    password: string;
    role: Boolean;
    cours: [];
    constructor(username: string, email: string, password: string, role: Boolean, cours: []) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.cours = cours;
    }
}