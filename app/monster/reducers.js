import { combineReducers } from 'redux';
import * as actions from './actions';

/*
const error_messages = {
  CHANGE_SCENE_UNKNOWN_SCENE: "cannot change scene to given cause it is not found in config",
  CHANGE_SCENE_NOT_LINKED_SCENE: "cannot change scene to given cause it is not linked with current one",
};
*/

let defaults = {
  game_phase: 'idle', // idle, dialog, alchemy, travel_map, interaction (with container), inventory?
  current_scene_name: null,
  money: {
    fishes: 0,
    foxes: 0,
  },
  clothes: {
    body: "dirty_dress",
  },
  inventory: [],
  flags: {},

  // UI react parts
  menues: {
    main_menu: {
      elements: [],
      current_element: null,
    },
    dialogs: {
      player_prev_sentence: null,
      npc_sentence: null,
      player_sentences: [],
    },
  },
  user_notification: {
    message: '',
    level: 'info',
    additional: null,
  },
};

function game_phase(state = defaults.game_phase, action) {
  switch (action.type) {
    case actions.CHANGE_SCENE:
      return 'idle';
    case action.DIALOG_START:
      return 'dialog';
    case actions.DIALOG_FINISH:
      return 'idle';
    default:
      return state;
  }
}

function flags(state = defaults.flags, action) {
  switch (action.type) {
    case actions.CHANGE_GLOBAL_FLAG:
      let new_state = {...state};
      new_state[action.name] = value;
      console.log('set global flag', name, 'to', value);
      return new_state;
    default:
      return state;
  }
}

function current_scene_name(state = defaults.current_scene_name, action) {
  switch (action.type) {
    case actions.CHANGE_SCENE:
      console.log('action', action.type, action, state);
      return action.scene_name;
    default:
      return state;
  }
}


function money(state = defaults.money, action) {
  switch (action.type) {
    case actions.CHANGE_MONEY_AMOUNT:
      console.log('action', actions.CHANGE_MONEY_AMOUNT, action, state);
      if (action.money_type != 'fishes' && action.money_type != 'foxes') {
        throw({message: "bad money type", value: action.money_type});
      }
      let new_state = {...state};
      // @TODO add negative values chack
      new_state[action.money_type] += action.amount;
      return new_state;
    default:
      return state;
  }
}


/**
 *  @TODO what about nested actions -- like
 *  take off current clothes
 *  put it in inventory
 *  get given clothes from inventory
 *  put it on
 */
function clothes(state = defaults.clothes, action) {
  switch (action.type) {
    case actions.DRESS_CLOTHES:
      console.log('action', actions.DRESS_CLOTHES, action, state);
      // TOSO -- its just a draft
      if (!action.item.body_layer) {
        console.log('actions.DRESS_CLOTHES fail -- not a clothes', action.item);
        return state;
      }
      let new_state = {...state, body: action.item};
      
      return new_state;
    default:
      return state;
  }
}


/////////////////////////////////////////
// UI
/////////////////////////////////////////

/*
function error_data(state = defaults.error_data, action) {
  switch (action.type) {
    case actions.ERROR_CHANGE_SCENE_UNKNOWN_SCENE:
      return {msg: error_messages.CHANGE_SCENE_UNKNOWN_SCENE, additional: {target_scene: action.scene_name}};
    case actions.ERROR_CHANGE_SCENE_NOT_LINKED_SCENE:
      return {msg: error_messages.CHANGE_SCENE_NOT_LINKED_SCENE, additional: {target_scene: action.scene_name}};
    default:
      return state;
  }
}
*/

function main_menu(state = defaults.menues.main_menu, action) {
  let state_copy;
  switch (action.type) {
    case actions.REBUILD_MAIN_MENU:
      console.log('action', action.type, action, state);
      let prepare_items = (links, type) => links.map(e => ({id: e, type: type}));
      let menu = {
        elements: [
          {id: 'go_to', items: prepare_items(action.current_scene.links, 'scenes')},
          {id: 'speak_to', items: prepare_items(action.current_scene.mobiles, 'mobiles')},
        ],
        current_element: null,
      };
      return menu;
    case actions.MAIN_MENU_CLICK:
      console.log('action', action.type, action, state);
      state_copy = {
        ...state,
        current_element: action.id
      }
      return state_copy;
    // really nothing interesting, just unset current_element
    case actions.MAIN_MENU_SUBELEMENT_CLICK:
      console.log('action', action.type, action, state);
      state_copy = {
        ...state,
        current_element: null
      }
      return state_copy;
    default:
      return state;
  }
}

function dialogs(state = defaults.menues.dialogs, action) {
  let new_state = {
    player_prev_sentence: null,
    npc_sentence: null,
    player_sentences: [],
  };
  switch (action.type) {
    case actions.DIALOG_FINISH:
      return new_state;
    case actions.DIALOG_ACTIVATE_NPC_SENTENCE:
      new_state.npc_sentence = action.sentence;
      return new_state;
    case actions.DIALOG_ACTIVATE_PLAYER_SENTENCES:
      new_state.player_sentences = action.sentences;
      return new_state;
    // TODO add player_prev_sentence
    default:
      return state;
  }
}

function user_notification(state = defaults.user_notification, action) {
  switch (action.type) {
    case actions.SHOW_NOTIFICATION:
      console.log('action', action.type, action, state);
      return {level: action.level, message: action.message, additional: action.additional};
    default:
      return state;
  }
}



const root_reducer = combineReducers({
  menues: combineReducers({
    main_menu,
    dialogs,
  }),
  game_phase,
  current_scene_name,
  flags,
  money,
  clothes,
  user_notification,
});

export default root_reducer;
