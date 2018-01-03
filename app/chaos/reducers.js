import { combineReducers } from 'redux';
import * as actions from './actions';

let defaults = {
  phase: null,
  tick: 0,
};

function phase(state = defaults.phase, action) {
  switch (action.type) {
    case actions.ADVANCE_SYMBOLS_COMPLETE:
      return 'exchange';
    default:
      return state;
  }
}

function tick(state = defaults.tick, action) {
  switch (action.type) {
    case actions.TICK:
      return state + 1;
    default:
      return state;
  }
}

const root_reducer = combineReducers({
  phase,
  tick,
});

export default root_reducer;
