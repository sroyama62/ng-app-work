import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, observable, forkJoin } from 'rxjs';
import { map, switchMap, combineAll, mergeMap, concatAll } from 'rxjs/operators';
import { SvgPath, IPoint, IViewBox, IBScanImage } from '../../models/svg-path';
import { BscanViewerComponent } from '../../components/bscan-viewer/bscan-viewer.component';
import { scale, rotate, translate, compose, applyToPoint, inverse } from 'transformation-matrix';

@Component({
  selector: 'app-play-ground-shell',
  templateUrl: './play-ground-shell.component.html',
  styleUrls: ['./play-ground-shell.component.scss']
})

export class PlayGroundShellComponent implements OnInit, AfterViewInit {
  scale: number[] = [1., 1.];
  translate: any = { x: 0, y: 0 }

  range: number[] = [6, 2.3];
  svgLine: SvgPath;
  bscanImage: ImageData;
  layers: number[][];

  viewBox: IViewBox;
  viewBoxStr: string = '0 0 0 0';

  y_low:number;
  y_high: number;

  paramBscanInfo:any;
  bscanImageInfo:any;
  bscanVolume:IBScanImage[]=[];

  @ViewChild(BscanViewerComponent) childBscanViewer: BscanViewerComponent;

  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.loadOCTLayer();
    this.loadBScan();
    this.loadVolume();
  }

  loadBScan() {
    const url = 'http://127.0.0.1:8887/252/bscan_001.jpg';
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.crossOrigin = "Anonymous";

    img.onload = (data => {
      const canvas: HTMLCanvasElement = this.document.createElement(
        "canvas"
      );
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

      ctx.canvas.width = img.width;
      ctx.canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      this.bscanImage = ctx.getImageData(
        0,
        0,
        img.width,
        img.height
      );
    });

    img.src = url;
  }

  loadOCTLayer() {
    const octDataUrl = 'http://127.0.0.1:8887/252/oct.json';
    const layerUrls = ['http://127.0.0.1:8887/252/layer_001.json', 'http://127.0.0.1:8887/252/layer_009.json'];

    let counter=0;
    const combined = this.http.get(octDataUrl).pipe(
      switchMap(octJson=>{
        this.paramBscanInfo = octJson['paramBscan'];
        this.bscanImageInfo = octJson['bscanImage'];

        const bscanHeight:number = this.bscanImageInfo['imgSizeY'];
        this.range[0] = this.paramBscanInfo['realScanLength1'];
        this.range[1] = this.paramBscanInfo['zResolution']*bscanHeight/1000;

        const getArr = [];
        layerUrls.forEach(url=>{
          getArr.push(this.http.get(url));
        })
        return getArr;
        //return of(getArr); //of(this.http.get(layerUrls[0]), this.http.get(layerUrls[1]));
    })).pipe(
        combineAll()
      );

      //set data from response.
      combined.subscribe(results=>{
        this.layers=new Array(results.length);
        let counter:number=0;
        results.forEach(x=>{
          this.layers[counter] = new Array();
          const bscanHeight:number = this.bscanImageInfo['imgSizeY'];
          const data = x['data'];
          for (let i = 0; i < data[0].length; i++) {
            this.layers[counter].push(this.range[1] * (1 - data[0][i] / bscanHeight));
          }
          counter++;
          console.log("counter: " + counter);
        })

        this.y_low =  0;//this.range[1] * (1 - 850 / bscanHeight);
        this.y_high = 1.8;//this.range[1] * (1 - 100 / bscanHeight);
        this.viewBoxStr = this.getViewBoxStr();
      });
  }

  loadVolume() {
    const nSlices=256;
    const layerUrls=[];
    const obs = [];
    console.log(">>>>>>>>>>> loading volume start: " + new Date());
    for(let i=0;i<nSlices; i++) {
      const url = 'http://127.0.0.1:8887/252/' + 'bscan_' + this.zeroPad(i+1,3)+'.jpg';
      obs.push(this.getBScanImage(url, i));
    }

    from(obs).pipe(
      combineAll()
    ).subscribe(results=>{
      results.forEach(bscan=>{
        const b = bscan as IBScanImage;
        this.bscanVolume[b.id] = b;
      });
      console.log(">>>>>>>>>> downloading volume end: " + new Date());
    });
  }

  private getBScanImage(url, id):Observable<IBScanImage>{
    const observable = new Observable<IBScanImage>(myObserver=>{
        const image: HTMLImageElement = new Image();
        image.setAttribute("crossOrigin", "anonymous");
        image.crossOrigin = "Anonymous";
        image.src = url;
        image.onload = () => {
          const canvas: HTMLCanvasElement = this.document.createElement(
            "canvas"
          );
          const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
          ctx.canvas.width = image.width;
          ctx.canvas.height = image.height;
          ctx.drawImage(image, 0, 0, image.width, image.height);
          const imageData = ctx.getImageData(
            0,
            0,
            image.width,
            image.height
          );
          const bscan:IBScanImage = {
            id: id,
            url: url,
            data: new Uint8Array(image.width*image.height)
          };
          for (let i = 0, n = 0; n < imageData.data.length; i++ , n += 4) {
            bscan.data[i] = imageData.data[n];
          }

          myObserver.next(bscan);
          myObserver.complete();
        };
     });

    return observable;
  }

  private zeroPad = function(num: number, places: number) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  };

  private getViewBoxStr(): string {
    const kx = this.scale[0];
    const ky = this.scale[1];

    const vbox1: IViewBox = {
      x: 0,
      y: this.y_low,
      w: this.range[0],
      h: this.y_high-this.y_low //range[1],
    }

    const x_cent=vbox1.x+vbox1.w/2;
    const y_cent=vbox1.y+vbox1.h/2;

    let mat_scale = compose(
      translate(x_cent, y_cent),
      scale(kx, ky),
      translate(-x_cent, -y_cent)
    );

    let mat_trans = translate(this.translate.x, this.translate.y);

    let mat_inv = inverse(
      compose(
        mat_trans,
        mat_scale
      )
    );

    const vw_topleft = applyToPoint(mat_inv, [vbox1.x, vbox1.y]);
    const vw_bottomright = applyToPoint(mat_inv, [vbox1.x+vbox1.w, vbox1.y+vbox1.h]);

    this.viewBox = {
      x: vw_topleft[0],
      y: vw_topleft[1],
      w: vw_bottomright[0]-vw_topleft[0],
      h: vw_bottomright[1]-vw_topleft[1]
    };

    const str = this.viewBox.x
      + ' ' + this.viewBox.y
      + ' ' + this.viewBox.w
      + ' ' + this.viewBox.h;
    console.log("viewbox: " + str);
    return str;
  }
}
