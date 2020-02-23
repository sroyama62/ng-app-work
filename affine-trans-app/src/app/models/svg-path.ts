export class SvgPath {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  constructor(svgPath?: SvgPath) {
    if (svgPath) {
      for (const key in svgPath) {
        if (svgPath.hasOwnProperty(key)) {
          this[key] = svgPath[key];
        }
      }
    }
  }

  getPath(points:number[], range:number[], dx:number): string {
    const p0 = this.getPoint(0, points[0], dx);
    let line = `M${p0.x} ${p0.y}`;
    for (let i = 1; i < points.length; i++) {
      const p = this.getPoint(i, points[i], dx);
      line += `L${p.x} ${p.y}`;
    }
    return line;
  }

  private getPoint(idx, y, dx): IPoint {
    //const dx = this.range[0] / (this.layers[0].length - 1);
    const p: IPoint = {
      x: idx * dx,
      y: y
    };
    return p;
  }
}

export interface IPoint{
  x:number;
  y:number;
}

export interface IViewBox {
  x:number;
  y:number;
  w:number;
  h:number;
}

export interface IBScanImage {
  id: number,
  url: string,
  data: Uint8Array
};
