import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { Store, select } from "@ngrx/store";
import *as fromAuthSelectors  from "./auth.selectors";
import { tap } from "rxjs/operators";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.store
        .pipe(
          select(fromAuthSelectors.isLoggedIn),
          tap(loggedIn => {
            if(!loggedIn) {
              this.router.navigateByUrl('/login');
            }
          })
        )
  }
}
