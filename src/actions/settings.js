export const SET_DEFAULT_RETURN_EMAIL = 'set-default-return-email';
export const LOAD_SETTINGS = 'load-settings';

export function setDefaultReturnEmail(email) {
  return {
    type: SET_DEFAULT_RETURN_EMAIL,
    email,
  };
}

export function loadSettings(settings) {
  return {
    type: LOAD_SETTINGS,
    settings,
  };
}
