import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient} from '@angular/common/http';

declare var JpxImage:any;

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  message: string='';
  
  @ViewChild('myImageCanvas', { static: true }) myImageCanvas: ElementRef<HTMLCanvasElement>;
  
  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {

  }

  loadImage() {
    //const url='http://localhost:52815/api/media';
    const url="http://localhost:52815/api/media/bscan";
    this.http.get(url, 
      {
        responseType: 'arraybuffer'
      }).subscribe(jpxData=>{
      let jpxImage = new JpxImage();
        const typeArraya=new Uint8Array(jpxData);
        //const data=[...typeArraya];
      jpxImage.parse(typeArraya);
      var width = jpxImage.width;
      var height = jpxImage.height;
      var componentsCount = jpxImage.componentsCount;
      var tileCount = jpxImage.tiles.length;
      var tileComponents = jpxImage.tiles[0];
      var pixelData = tileComponents.items;

      var context = this.myImageCanvas.nativeElement.getContext('2d');
      this.myImageCanvas.nativeElement.width=width;
      this.myImageCanvas.nativeElement.height=height;

      var img = context.createImageData(width, height);

      for (var i = 0, j=0; i < width*height; i++, j++) {
        img.data[4*i] = pixelData[3*i];
        img.data[4*i+1] = pixelData[3*i+1];
        img.data[4*i+2] = pixelData[3*i+2];
        img.data[4*i+3] = 255;// pixelData[i];///10;
       }
      /*
      for (var i = 0; i < pixelData.length; i++) {
        img.data[i*4+0] = pixelData[i];
        img.data[i*4+1] = pixelData[i];
        img.data[i*4+2] = pixelData[i];
        img.data[i*4+3] = 255;// pixelData[i];///10;
       }
       */
      context.putImageData(img,0,0);

      this.message='image size: ' + width + ', ' + height;;
    });
  }
}
