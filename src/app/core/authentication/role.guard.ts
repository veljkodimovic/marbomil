import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class RoleGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const permissions = route.data['onlyFor'] as Array<string>;
        const userRoles = [];
        if (JSON.parse(localStorage.getItem('username')) && JSON.parse(localStorage.getItem('username')).role) {
            userRoles.push(JSON.parse(localStorage.getItem('username')).role);
        }

        for (const p of permissions) {
            if (userRoles.includes(p)) {
                return true;
            }
        }
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }, replaceUrl: true});
        return false;
    }
}
