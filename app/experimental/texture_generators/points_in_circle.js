
import Util from "common/util";
import Color from "common/color";
import * as d3 from "d3";

////////////////////////////////////////////////
// WARNING!!! doesnt work, rewite to BasicDrawer
////////////////////////////////////////////////
export default class PointsInCicrle {

  generate(count, func) {
    this.points = [];
    while(count--) {
      let angle = Math.random() * 2 * Math.PI;
      let radius = func(Math.random());
      let coords = Util.from_polar_coords(angle, radius);
      this.points.push({angle: angle, radius: radius, x: coords.x, y: coords.y});
    }
    this.points;
    return true;
  }

  static linear(random) {
    return random;
  }

  static pow(random) {
    return Math.pow(random, 0.2);
  }

  draw(scale, color = [50, 100, 0]) {
    let graphics = new PIXI.Graphics();
    let radius = .01;

    this.points.forEach(point => {
      graphics.beginFill(Color.to_pixi(Color.random_near(color, 20)));
      graphics.drawCircle(scale * point.x, scale * point.y, scale * radius);
      graphics.closePath();
      graphics.endFill();
    });

    return graphics;
  }

  draw_triangles(scale, color = [50, 100, 0]) {
    let voronoi = d3.voronoi().x(p => p.x).y(p => p.y);
    let diagram = voronoi(this.points);
    let triangles = diagram.triangles();

    let graphics = new PIXI.Graphics();
    triangles.forEach(triangle => {
      graphics.beginFill(Color.to_pixi(Color.random_near(color, 20)));
      graphics.drawPolygon(triangle.map(point => new PIXI.Point(scale * point.x, scale * point.y)));
      graphics.closePath();
      graphics.endFill();
    });
    graphics.lineStyle(scale * .005, Color.to_pixi(Color.brighter(color, 100)));
    /*
    very strange and beautiful
    diagram.edges.forEach(edge => {
      if (!edge[1]) {
        return;
      }
      graphics.moveTo(scale * edge[0][0], scale * edge[0][1]);
      graphics.lineTo(scale * edge[1][0], scale * edge[1][1]);
      graphics.closePath();
    });
    */
    triangles.forEach(triangle => {
      // pixi has sharp angles when joining lines in path, so do not use path
      graphics.moveTo(scale * triangle[0].x, scale * triangle[0].y);
      graphics.lineTo(scale * triangle[1].x, scale * triangle[1].y);
      graphics.moveTo(scale * triangle[1].x, scale * triangle[1].y);
      graphics.lineTo(scale * triangle[2].x, scale * triangle[2].y);
      graphics.moveTo(scale * triangle[2].x, scale * triangle[2].y);
      graphics.lineTo(scale * triangle[0].x, scale * triangle[0].y);
    });
    return graphics;
  }
}