// @flow
import React from 'react'

import type { DrawerDebugInfoUnit, DrawerOnTickCallback } from 'experimental/drawer'

type Props = {
  dispatchActionTick: DrawerOnTickCallback,
  dispatchActionMouseMove: (event: Event) => void,
  fps: number,
  mousePos: { x: number, y: number },
  additional: Array<DrawerDebugInfoUnit>,
  init: (DrawerOnTickCallback) => void,
}

export class Sample extends React.Component<Props> {
  componentDidMount() {
    // we just pass dispatchActionTick to init()
    this.props.init(this.props.dispatchActionTick)
  }

  componentDidUpdate() {
  }

  // bad. but i dont care for now
  // TODO fix to Link
  goBack() {
    window.location.href = '/samples_collection'
  }

  onMouseMove(event: SyntheticMouseEvent<any>) {
    this.props.dispatchActionMouseMove(event.nativeEvent)
  }

  render() {
    return (
      <div style={{ maxWidth: '1280px' }}>
        <div className="panel-group">

          <div className="panel panel-success">
            <div className="panel-body">
              <div className="" id="back_link">
                <button type="button" className="btn btn-success btn" onClick={this.goBack}>
                  <span className="glyphicon glyphicon-triangle-left" aria-hidden="true" />
                  &nbsp;back to collection
                </button>
              </div>
            </div>
          </div>

          <div className="panel panel-success">
            <div className="panel-body">
              <div className="" id="view_container">
                <canvas id="view" width="800" height="800" onMouseMove={this.onMouseMove.bind(this)} />
              </div>
            </div>
          </div>

          <div className="panel panel-success">
            <div className="panel-body">
              <div>
                <div>
                  FPS:&nbsp;
                  <span>{this.props.fps}</span>
                </div>
                <div>
                  mouse position:
                  <span>{JSON.stringify(this.props.mousePos, null, 2)}</span>
                </div>
                {this.props.additional.map(e => (
                  <div key={e.id}>
                    {e.text}
                    :
                    {' '}
                    <span id={e.id}>{e.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
