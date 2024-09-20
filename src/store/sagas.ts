import {all, fork} from 'redux-saga/effects';

export default function* () {
  yield fork(bootstrap);
}

export function* bootstrap() {
  try {
    yield all([]);
  } catch (error) {
    // error handling
  }
}
