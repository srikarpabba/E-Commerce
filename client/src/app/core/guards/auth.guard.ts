import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router,
              private toastr: ToastrService) {}
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.accountService.currentUser$.pipe(
          map(auth => {
            if (auth) {
                const tokenDecode = JSON.parse(atob(auth.token.split('.')[1]));
                if (this._tokenExpired(tokenDecode.exp)) {
                    this.toastr.warning('You must be logged in to access this area.', 'Sorry!');
                    this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
                    return false;
                }
                return true;
            } else {
                this.toastr.warning('You must be logged in to access this area.', 'Sorry!');
                this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
                return false;
            }
          })
        );
    }
 
    private _tokenExpired(expiration): boolean {
      return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}