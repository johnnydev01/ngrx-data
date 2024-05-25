import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromAuthReducers from './reducers/index';


export const selectAuthState = createFeatureSelector<fromAuthReducers.AuthState>(fromAuthReducers.authFeatureKey);


export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  (isLoggedIn) => !isLoggedIn
);
