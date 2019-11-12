// @flow
import Color from 'common/color'
import * as PIXI from 'pixi.js'
import * as R from 'ramda'
import * as U from 'common/utils'
import random from 'random'
import seedrandom from 'seedrandom'

import { initDrawer } from 'experimental/drawer'
import type { DrawerState, DrawerOnTickCallback } from 'experimental/drawer'
import type { XYPoint } from 'common/utils'

type Vector = XYPoint

type Point = {
  id: number,
  x: number,
  y: number,
  mass: number,
  speed: Vector,
  // acc: Vector,
}

type State = DrawerState & {
  points: Array<Point>,
}

const initGraphics = (oldState: DrawerState): State => {
  const state = { ...oldState }
  const seed = Date.now()
  random.use(seedrandom(seed))
  state.points = [{
    id: 1,
    x: 50,
    y: 40,
    mass: 1,
    speed: { x: 0.1, y: 0 },
  }, {
    id: 2,
    x: 50,
    y: 60,
    mass: 5,
    speed: { x: 0, y: 0 },
  }]
  return state
}

const redraw = (oldState: DrawerState): DrawerState => {
  const state = { ...oldState }
  state.points = calcGravityAcceleration(state.points)
  state.points = state.points.map(p => ({ ...p, x: p.x + p.speed.x, y: p.y + p.speed.y }))
  state.base_container.removeChildren()
  state.points.forEach(p => {
    // console.log('PIONT', p)
    const graphics = new PIXI.Graphics()
    graphics.beginFill(Color.to_pixi([255, 255, 255]), 1)
    graphics.drawCircle(0, 0, p.mass)
    graphics.endFill()
    graphics.x = p.x
    graphics.y = p.y
    state.base_container.addChild(graphics)
  })
  return state
}

const calcGravityAcceleration = (points: Array<Point>): Array<Point> => R.map(p => {
  const accelerationSum = R.reduce((accSpeed, p2) => {
    if (p === p2) {
      return accSpeed
    }
    const acceleration = 0.1 * p2.mass / (U.distance(p, p2) ** 2)
    const accVector = { x: acceleration * (p2.x - p.x), y: acceleration * (p2.y - p.y) }
    return crossSumm(accSpeed, accVector)
  }, { x: 0, y: 0 }, points)
  if (p.id === 2) {
    console.log('acc sum', p.speed, accelerationSum)
  }
  return { ...p, speed: crossSumm(p.speed, accelerationSum) }
})(points)

// const crossProduct = (a, b) => ({ x: a.x * b.y, y: b.x * a.y })
// const crossProduct = (a, b) => ({ x: a.x * b.y, y: -b.x * a.y }) OR?

const crossSumm = (a, b) => ({ x: a.x + b.x, y: a.y + b.y })

// const updateDebugInfo = (state: State): Array<DrawerDebugInfoUnit> => []
const updateDebugInfo = () => []

export const init = (drawerOnTickCallback: DrawerOnTickCallback) => initDrawer(
  'square',
  updateDebugInfo,
  initGraphics,
  redraw,
  drawerOnTickCallback,
)