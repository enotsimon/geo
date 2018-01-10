
import React from 'react';
import PropTypes from 'prop-types';

import MainMenuContainer from './main_menu_container';
import SceneContainer from './scene_container';
import DialogContainer from './dialog_container';
import ShowHideBlock from './show_hide_block';

class App extends React.Component {
  render() {
    return (
      <div id="main" style={{marginTop: '20px', marginBottom: '20px'}}>
        <div className="row">
          <div className="col-md-8 col-md-offset-2">

            <ShowHideBlock show_on_phases={this.props.show_scene_phases}>
              <SceneContainer />
            </ShowHideBlock>

            <ShowHideBlock show_on_phases={this.props.show_dialog_phases}>
              <DialogContainer />
            </ShowHideBlock>

            <ShowHideBlock show_on_phases={this.props.show_main_menu_phases}>
              <MainMenuContainer />
            </ShowHideBlock>

          </div>
        </div>
      </div>
    );
  }
}

// i really hate this cause we mix some buisness logic to pure presentational component
App.propTypes = {
  show_scene_phases: PropTypes.arrayOf(PropTypes.string).isRequired,
  show_dialog_phases: PropTypes.arrayOf(PropTypes.string).isRequired,
  show_main_menu_phases: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;