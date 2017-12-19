
import game from './monster';

export const CHANGE_SCENE = 'change_scene';
export const REBUILD_MAIN_MENU = 'rebuild_main_menu';
export const CHANGE_MONEY_AMOUNT = 'change_money_amount';
export const DRESS_CLOTHES = 'dress_clothes';
export const INVENTORY_ADD_ITEM = 'inventory_add_item';
export const INVENTORY_REMOVE_ITEM = 'inventory_remove_item';
export const CHANGE_GLOBAL_FLAG = 'change_global_flag';

export const ERROR_CHANGE_SCENE_UNKNOWN_SCENE = 'error_change_scene_unknown_scene';
export const ERROR_CHANGE_SCENE_NOT_LINKED_SCENE = 'error_change_scene_not_linked_scene';
export const SHOW_NOTIFICATION = 'show_notification';


export function error_change_scene_unknown_scene(scene_name) {
  return show_notification('error', ERROR_CHANGE_SCENE_UNKNOWN_SCENE, {target_scene: scene_name});
}

export function error_change_scene_not_linked_scene(scene_name) {
  return show_notification('error', ERROR_CHANGE_SCENE_NOT_LINKED_SCENE, {target_scene: scene_name});
}

export function show_notification(level, message, additional) {
  return {type: SHOW_NOTIFICATION, level, message, additional};
}

export function change_scene(scene_name) {
  return {type: CHANGE_SCENE, scene_name};
}

// current_scene -- scene object from config
export function rebuild_main_menu(current_scene) {
  return {type: REBUILD_MAIN_MENU, current_scene};
}


export function change_money_amount(money_type, amount) {
  return {type: CHANGE_MONEY_AMOUNT, money_type, amount};
}


// explisitly set layer?
export function dress_clothes(item) {
  return {type: DRESS_CLOTHES, item};
}


export function inventory_add_item(item) {
  return {type: INVENTORY_ADD_ITEM, item};
}


export function inventory_remove_item(item) {
  return {type: INVENTORY_REMOVE_ITEM, item};
}


export function change_global_flag(flag) {
  return {type: CHANGE_GLOBAL_FLAG, flag};
}

/////////////////////////////////
// bound action creators
/////////////////////////////////
export function bound_change_scene(scene_name) {
  let target_scene = game.config.scenes[scene_name];
    let current_scene = game.config.scenes[game.store.getState().current_scene_name];
    if (!target_scene) {
      game.store.dispatch(error_change_scene_unknown_scene(scene_name));
      return false;
    }
    // current_scene can be null -- on game init
    if (current_scene && current_scene.links.indexOf(target_scene.name) == -1) {
      game.store.dispatch(error_change_scene_not_linked_scene(scene_name));
      return false;
    }

    game.store.dispatch(change_scene(scene_name));
    // it has changed! dont forget it!
    current_scene = game.config.scenes[game.store.getState().current_scene_name];
    game.store.dispatch(rebuild_main_menu(current_scene));
}



/////////////////////////////////////////
// UI
/////////////////////////////////////////
export const MAIN_MENU_CLICK = 'main_menu_click';
export const MAIN_MENU_SUBELEMENT_CLICK = 'main_menu_subelement_click';

export function main_menu_click(id) {
  return {type: MAIN_MENU_CLICK, id};
}

export function main_menu_subelement_click(id) {
  return {type: MAIN_MENU_SUBELEMENT_CLICK, id};
}

/////////////////////////////////
// UI bound action creators
/////////////////////////////////
export function bound_main_menu_action(id_subelement) {
  let state = game.store.getState();
  if (state.menues.main_menu.current_element == 'go_to') {
    bound_change_scene(id_subelement);
  }
  game.store.dispatch(main_menu_subelement_click(id_subelement));
}

