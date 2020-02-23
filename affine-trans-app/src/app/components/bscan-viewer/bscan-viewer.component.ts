import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { IViewBox } from '../../models/svg-path';
@Component({
  selector: 'app-bscan-viewer',
  templateUrl: './bscan-viewer.component.html',
  styleUrls: ['./bscan-viewer.component.scss']
})

export class BscanViewerComponent implements OnInit {

  @Input() bscanImage:ImageData;
  @Input() range:number[];
  @Input() viewBox:IViewBox={x:0,y:0,w:0,h:0};

  @ViewChild('bscanCanvas', { static: false }) myCanvas;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  onResize($event){
    this.drawBScan();
  }

  ngOnChanges() {
    this.drawBScan();
  }

  getCanvasSize() {
    if(this.myCanvas) {
      return {w:this.myCanvas.nativeElement.offsetWidth, h:this.myCanvas.nativeElement.offsetHeight};
    }
  }
  private drawBScan(){
    if(!this.bscanImage || this.viewBox == undefined)
      return;

    var ctx = this.myCanvas.nativeElement.getContext('2d');
    ctx.canvas.width = this.myCanvas.nativeElement.offsetWidth;
    ctx.canvas.height = this.myCanvas.nativeElement.offsetHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const imgCanvas = this.imageToCanvas(this.bscanImage);

    const sx = this.viewBox.x*imgCanvas.width/this.range[0];
    const sy = this.viewBox.y*imgCanvas.height/this.range[1];
    const sw = this.viewBox.w*imgCanvas.width/this.range[0];
    const sh = this.viewBox.h*imgCanvas.height/this.range[1];
    //ctx.drawImage(imgCanvas, 0, 0, imgCanvas.width, imgCanvas.height, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(imgCanvas, sx, sy, sw, sh, 0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  private imageToCanvas(image: ImageData) {
    const canvas = this.document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var newctx: CanvasRenderingContext2D = canvas.getContext('2d');
    newctx.putImageData(image, 0, 0);
    return canvas;
  }
}
