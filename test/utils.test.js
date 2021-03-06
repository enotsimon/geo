// @flow
/* eslint-env mocha */
import { describe, it } from 'mocha'
import { assert } from 'chai'
// import * as R from 'ramda'

import * as U from '../app/common/utils'

describe('angleBy3Points', () => {
  const samples = [
    { a: { x: -1, y: 0 }, b: { x: 0, y: 0 }, c: { x: 1, y: 0 }, expect: Math.PI },
    { a: { x: -1, y: 0 }, b: { x: 0, y: 0 }, c: { x: 0, y: -1 }, expect: Math.PI / 2 },
    { a: { x: -1, y: 0 }, b: { x: 0, y: 0 }, c: { x: 0, y: -1 }, expect: Math.PI / 2 },
    { a: { x: -1, y: 0 }, b: { x: 0, y: 0 }, c: { x: -1, y: -1 }, expect: Math.PI / 4 },
    { a: { x: -1, y: 0 }, b: { x: 0, y: 0 }, c: { x: 1, y: -1 }, expect: Math.PI / 2 + Math.PI / 4 },
  ]

  it('calc angles by given samples', () => {
    samples.forEach(sample => {
      const result = U.angleBy3Points(sample.a, sample.b, sample.c)
      assert.equal(result, sample.expect)
    })
  })
})

describe('findNearestNode', () => {
  it('should find nearest point negative values', () => {
    const result = U.findNearestPoint({ x: 2, y: 2 }, [{ x: -1, y: -1 }, { x: 10, y: 10 }])
    const expect = { x: -1, y: -1 }
    assert.deepEqual(result, expect)
  })
  it('should find nearest point exact values', () => {
    const result = U.findNearestPoint({ x: 2, y: 2 }, [{ x: 2, y: 2 }, { x: 10, y: 10 }])
    const expect = { x: 2, y: 2 }
    assert.deepEqual(result, expect)
  })
  it('should find nearest point zero values', () => {
    const result = U.findNearestPoint({ x: 0, y: 0 }, [{ x: 2, y: 2 }, { x: 10, y: 10 }])
    const expect = { x: 2, y: 2 }
    assert.deepEqual(result, expect)
  })
})

describe('distance', () => {
  it('should correctly calc distance between xy-points', () => {
    assert.equal(U.distance({ x: 0, y: 0 }, { x: 0, y: 0 }), 0)
    assert.equal(U.distance({ x: -2, y: -3 }, { x: -2, y: -3 }), 0)
    assert.equal(U.distance({ x: -1, y: 0 }, { x: 0, y: 0 }), 1)
    assert.equal(U.distance({ x: 0, y: 0 }, { x: 1, y: 1 }), Math.sqrt(2))
  })
})

describe('compareDistance', () => {
  it('should correctly compare distance between xy-points and given value', () => {
    assert.equal(U.compareDistance({ x: 0, y: 0 }, { x: 2, y: 0 }, 1), 1)
    assert.equal(U.compareDistance({ x: 0, y: 0 }, { x: -2, y: 0 }, 1), 1)
    assert.equal(U.compareDistance({ x: 0, y: 0 }, { x: 2, y: 0 }, 3), -1)
    assert.equal(U.compareDistance({ x: 0, y: 0 }, { x: 2, y: 0 }, 2), 0)
  })
})

describe('toPolarCoords', () => {
  it('should convert xy-point to polar coords', () => {
    assert.deepEqual(U.toPolarCoords({ x: 0, y: -1 }), { angle: -Math.PI / 2, radius: 1 })
    assert.deepEqual(U.toPolarCoords({ x: 0, y: 1 }), { angle: Math.PI / 2, radius: 1 })
    assert.deepEqual(U.toPolarCoords({ x: 1, y: 0 }), { angle: 0, radius: 1 })
    assert.deepEqual(U.toPolarCoords({ x: -1, y: 0 }), { angle: Math.PI, radius: 1 })
    assert.deepEqual(U.toPolarCoords({ x: 0, y: 0 }), { angle: 0, radius: 0 })
  })
})

describe('fromPolarCoords', () => {
  it('should convert polar coords to xy-point', () => {
    // i cannot add other simple cases because of computational error
    assert.deepEqual(U.fromPolarCoords({ angle: 0, radius: 1 }), { x: 1, y: 0 })
    assert.deepEqual(U.fromPolarCoords({ angle: 0, radius: 0 }), { x: 0, y: 0 })
  })
})

describe('lineFormula', () => {
  const samples = [
    { p1: { x: 1, y: 1 }, p2: { x: 3, y: 1 }, expect: { a: 0, b: 2, c: -2 } },
    { p1: { x: 3, y: 1 }, p2: { x: 1, y: 1 }, expect: { a: 0, b: -2, c: 2 } },
    { p1: { x: -1, y: 1 }, p2: { x: 3, y: 1 }, expect: { a: 0, b: 4, c: -4 } },
    { p1: { x: 0, y: 2 }, p2: { x: 0, y: 1 }, expect: { a: 1, b: 0, c: 0 } },
    // not sure if it is correct
    { p1: { x: 0, y: 1 }, p2: { x: 0, y: 2 }, expect: { a: 1, b: -0, c: -0 } },
    { p1: { x: 0, y: 0 }, p2: { x: 1, y: 1 }, expect: { a: 1, b: -1, c: -0 } },
  ]
  samples.forEach(e => {
    it(`should calc line formula for (${e.p1.x}, ${e.p1.y}) and (${e.p2.x}, ${e.p2.y})`, () => {
      assert.deepEqual(U.lineFormula(e.p1, e.p2), e.expect)
    })
  })
})

describe('linesCrossPoint', () => {
  const samples = [
    { x1: { x: 0, y: 1 }, x2: { x: 2, y: 1 }, y1: { x: 1, y: 0 }, y2: { x: 1, y: 2 }, expect: { x: 1, y: 1 } },
    { x1: { x: 0, y: 1 }, x2: { x: 1, y: 1 }, y1: { x: 0, y: 0 }, y2: { x: 0, y: 0 }, expect: null },
  ]
  samples.forEach((e, i) => {
    it(`should calc lines crossing point for case ${i}`, () => {
      assert.deepEqual(U.linesCrossPoint(U.lineFormula(e.x1, e.x2), U.lineFormula(e.y1, e.y2)), e.expect)
    })
  })
})

describe('isSquaresIntersect', () => {
  const samples = [
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 0 }, { x: 2, y: 2 }, true],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 3, y: 3 }, true],
    [{ x: -4, y: -4 }, { x: -2, y: -2 }, { x: -3, y: -3 }, { x: 0, y: 0 }, true],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 0 }, { x: 4, y: 2 }, true],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 2, y: 0 }, true],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 4, y: 4 }, true],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 4, y: 4 }, { x: 2, y: 2 }, true],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 4, y: 4 }, { x: 3, y: 3 }, false],
    [{ x: 2, y: 2 }, { x: 0, y: 0 }, { x: 3, y: 3 }, { x: 4, y: 4 }, false],
    [{ x: -4, y: -4 }, { x: -2, y: -2 }, { x: -1, y: -1 }, { x: 0, y: 0 }, false],
    // this demonstrate float rounding error
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 2.000000000000001, y: 0 }, { x: 4, y: 2 }, false],
    [{ x: 0, y: 0 }, { x: 9999, y: 2 }, { x: 9999.000000000001, y: 2 }, { x: 20000, y: 4 }, false],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 2.0000000000000001, y: 0 }, { x: 4, y: 2 }, true],
    [{ x: 0, y: 0 }, { x: 9999, y: 2 }, { x: 9999.0000000000001, y: 2 }, { x: 20000, y: 4 }, true],
  ]
  samples.forEach(([a1, a2, b1, b2, expect], i) => {
    it(`should tell if squares intersect for case ${i}`, () => {
      assert.equal(U.isSquaresIntersect(a1, a2, b1, b2), expect)
    })
  })
})

describe('intervalsCrossPoint & intervalsCrossPointNoEdge', () => {
  const samples = [
    [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 1 }, { x: 1, y: 1 }],
    [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 6, y: 6 }, { x: 2, y: 1 }, { x: 2, y: 1 }, null],
    [{ x: -5, y: -3 }, { x: 2, y: -3 }, { x: -3, y: 1 }, { x: -3, y: -9 }, { x: -3, y: -3 }, { x: -3, y: -3 }],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 3, y: 3 }, null, null],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 1.5, y: 1.5 }, { x: 3.5, y: 3.5 }, null, null],
    [{ x: 0, y: 0 }, { x: 2, y: 2 }, { x: -3, y: 2 }, { x: -1, y: 0 }, null, null],
    // this demonstrate float rounding error
    [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 6, y: 6 }, { x: 2.000000000000001, y: 1 }, null, null],
    [{ x: 0, y: 1 }, { x: 2, y: 1 }, { x: 6, y: 6 }, { x: 2.0000000000000001, y: 1 }, { x: 2, y: 1 }, null],
    [{ x: 0, y: 1 }, { x: 9999, y: 1 }, { x: 6, y: 6 }, { x: 9999.000000000001, y: 1 }, null, null],
    [{ x: 0, y: 1 }, { x: 9999, y: 1 }, { x: 6, y: 6 }, { x: 9999.0000000000001, y: 1 }, { x: 9999, y: 1 }, null],
  ]
  samples.forEach(([a1, a2, b1, b2, expect], i) => {
    it(`intervalsCrossPoint should tell if squares intersect for case ${i}`, () => {
      assert.deepEqual(U.intervalsCrossPoint(a1, a2, b1, b2), expect)
    })
  })
  samples.forEach(([a1, a2, b1, b2,, expect], i) => {
    it(`intervalsCrossPointNoEdge should tell if squares intersect for case ${i}`, () => {
      assert.deepEqual(U.intervalsCrossPointNoEdge(a1, a2, b1, b2), expect)
    })
  })
  it('intervalsCrossPoint should throw exception if a1 === a2', () => {
    assert.throws(
      () => U.intervalsCrossPoint({ x: 2, y: 6 }, { y: 6, x: 2 }, { x: 0, y: 0 }, { x: 1, y: 1 }),
      'a1 === a2 or b1 === b2 which is not allowed'
    )
  })
  it('intervalsCrossPoint should throw exception if b1 === b2', () => {
    assert.throws(
      () => U.intervalsCrossPoint({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 6 }, { y: 6, x: 2 }),
      'a1 === a2 or b1 === b2 which is not allowed'
    )
  })
})

describe('pairs', () => {
  it('should return all pairs for 1, 2, 3', () => {
    assert.deepEqual(U.pairs([1, 2, 3]), [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]])
  })
})
describe('noSameValuesPairs', () => {
  it('should return all no same value pairs for 1, 2, 3', () => {
    assert.deepEqual(U.noSameValuesPairs([1, 2, 3]), [[1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]])
  })
})
describe('noOrderPairs', () => {
  it('should return all non-depending of elements order pairs for 1, 2, 3', () => {
    assert.deepEqual(U.noOrderPairs([1, 2, 3]), [[1, 1], [1, 2], [1, 3], [2, 2], [2, 3], [3, 3]])
  })
})
describe('noOrderNoSameValuesPairs', () => {
  it('should return all non-depending of elements order pairs for 1, 2, 3', () => {
    assert.deepEqual(U.noOrderNoSameValuesPairs([1, 2, 3]), [[1, 2], [1, 3], [2, 3]])
  })
  it('should return all non-depending of elements order pairs for 3 objects', () => {
    const sample = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 1 }]
    assert.deepEqual(
      U.noOrderNoSameValuesPairs(sample),
      [[sample[0], sample[1]], [sample[0], sample[2]], [sample[1], sample[2]]]
    )
  })
})
