import { auth } from "../../core/api/auth";

export const AUTH = 'AUTH';

export function handleAuth(userKey) {
  return async dispatch => {
    return auth(userKey).then(response => {
      dispatch(authAction(response.data));
    });
  };
}

//////////////////////////////////////////////
export function authAction(user) {
  return {
    type: AUTH,
    loggedUserId: user.userId,
  }
}