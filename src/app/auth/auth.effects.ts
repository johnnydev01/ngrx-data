import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";

import * as fromAuthActions from '../auth/auth.actions';
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
   this.actions$
   .pipe(
     ofType(fromAuthActions.login),
     tap(action =>
       localStorage.setItem('user', JSON.stringify(action.user))
      )
   ), {dispatch: false});


   logout$ = createEffect(() =>
   this.actions$
   .pipe(
     ofType(fromAuthActions.logout),
     tap(action => {
       localStorage.removeItem('user')
       this.router.navigateByUrl('/login');
     }
      )
   ), {dispatch: false});

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}
}
