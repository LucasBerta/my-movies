import { AUTH } from "../actions/auth.action";

export default function authReducer(state = {}, action) {
  switch (action.type) {
    case AUTH:
      return {
        loggedUserId: action.loggedUserId
      };
    default:
      return state;
  }
}