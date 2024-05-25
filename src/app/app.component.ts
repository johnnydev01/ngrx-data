import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';

import * as fromAuthSelectors from './auth/auth.selectors';
import * as fromAuthActions from './auth/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(
      private router: Router,
      private store: Store<AppState>

    ) {

    }

    ngOnInit() {
      const userProfile = localStorage.getItem('user');

      if (userProfile) {
        this.store.dispatch(fromAuthActions.login({user: JSON.parse(userProfile)}))
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.isLoggedIn$ = this.store.pipe(
        select(fromAuthSelectors.isLoggedIn)
      );

      this.isLoggedOut$ = this.store.pipe(
        select(fromAuthSelectors.isLoggedOut)
      );
    }

    logout() {
      this.store.dispatch(fromAuthActions.logout());
    }

}
