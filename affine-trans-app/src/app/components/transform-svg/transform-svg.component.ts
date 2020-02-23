import { Component, OnInit, Input } from '@angular/core';

import { SvgPath, IPoint } from '../../models/svg-path';

@Component({
  selector: 'app-transform-svg',
  templateUrl: './transform-svg.component.html',
  styleUrls: ['./transform-svg.component.scss']
})

export class TransformSvgComponent implements OnInit {
  @Input() layers:number[][];
  @Input() range:number[];
  @Input() viewBoxStr:string;
  @Input() lineColor: string;

  layerPaths: any;
  svgline_width:number;
  viewBox_str:string='';

  constructor() { }

  ngOnInit(): void {
    this.svgline_width = 0.005;
    this.redraw();
  }

  ngOnChanges() {
    this.redraw();
  }

  private redraw(){
    if(this.layers == null || this.layers == undefined || this.layers.length<=0)
      return;

    this.layerPaths = new Array(this.layers.length);
    for(let i=0;i<this.layers.length;i++) {
      const path = new SvgPath();
      const dx = this.range[0] / (this.layers[i].length - 1);
      const line = path.getPath(this.layers[i],this.range, dx);
      this.layerPaths[i] = line;
    }
  }



}
