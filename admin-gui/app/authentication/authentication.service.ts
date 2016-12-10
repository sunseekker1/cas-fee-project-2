import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './user';





@Injectable()
export class AuthenticationService {

    constructor(private _router: Router){
    }

    private users: Array<User>= [
        new User('admin@admin.com','adm9'),
        new User('user1@gmail.com','a23')
    ];

    public logout() {
        localStorage.removeItem("user");
        this._router.navigate(['Login']);
    }

    public login(user: User){
        var authenticatedUser: User = this.users.find(u => u.email === user.email);
        if (authenticatedUser && authenticatedUser.password === user.password){
            localStorage.setItem("user", JSON.stringify(authenticatedUser));
            this._router.navigate(['dashboard']);
            return true;
        }
        return false;

    }

    public checkCredentials(){
        if (localStorage.getItem("user") === null){
            this._router.navigate(['login']);
        }
    }
}