
import Util from "common/util";
import Tableau from "experimental/tableau";

/**
 * 
 */
export default class VichniacVote extends Tableau {
  constructor() {
    super();
    this.x_size = 200;
    this.y_size = 200;
  }


  init_element_state(element) {
    element.color = Math.random() > 0.5 ? 1 : 0;
  }

  mutate_state() {
    let step = 15;
    // throttle to lower speed
    if (this.ticks % step == 1) {
      super.mutate_state();
    }
    if (this.ticks % (30 * step) == 1) {
      this.init_state();
    }
  }

  // this func suppose to change new_color prop, not color!
  mutate_element_state(element) {
    let x = element.x, y = element.y;
    let e1 = this.get_element_color(x - 1, y - 1, this.out_of_border_func),
        e2 = this.get_element_color(x + 0, y - 1, this.out_of_border_func),
        e3 = this.get_element_color(x + 1, y - 1, this.out_of_border_func),
        e4 = this.get_element_color(x - 1, y + 0, this.out_of_border_func),
        e5 = this.get_element_color(x + 0, y + 0, this.out_of_border_func),
        e6 = this.get_element_color(x + 1, y + 0, this.out_of_border_func),
        e7 = this.get_element_color(x - 1, y + 1, this.out_of_border_func),
        e8 = this.get_element_color(x + 0, y + 1, this.out_of_border_func),
        e9 = this.get_element_color(x + 1, y + 1, this.out_of_border_func);
    element.new_color = e1 + e2 + e3 + e4 + e5 + e6 + e7 + e8 + e9 > 4 ? 1 : 0;
  }

  out_of_border_func() {
    return 1;
  }
}