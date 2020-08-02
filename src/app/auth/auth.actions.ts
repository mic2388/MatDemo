import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticted';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

export class SetAuthenticated implements Action {
  readonly type: string = SET_AUTHENTICATED;
}

export class SetUnauthencticated implements Action {
  readonly type: string = SET_UNAUTHENTICATED;
}


export type AuthActions = SetAuthenticated | SetUnauthencticated;
