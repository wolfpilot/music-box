// Lib
import watch from 'redux-watch';

// Utils
import { setSession, fetchMe } from './actions';

// Keep refs to the watchers so they can be unsubscribed when necessary
let sessionWatcher;

export const watchSession = (store, accessToken) => {
  if (!accessToken) {
    return;
  }

  store.dispatch(setSession(accessToken));
  store.dispatch(fetchMe());

  sessionWatcher();
};

export const watcher = (store, selector, action) => {
  const w = watch(store.getState, selector);

  // Return unsubscribe function
  return store.subscribe(w(payload => action(store, payload)));
};

export const createWatchers = store => {
  sessionWatcher = watcher(store, 'session.accessToken', watchSession);
};
