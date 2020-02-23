import { Component, OnInit } from '@angular/core';

// import * as x3dom from 'node_modules/x3dom/x3dom.js';
// import * as api '../../../assets/jslib/im6/api.js';

declare var x3dom: any;
declare function isEnableWebGL(): any;
declare function mySum(a,b): any;

@Component({
  selector: 'app-volume-viewer',
  templateUrl: './volume-viewer.component.html',
  styleUrls: ['./volume-viewer.component.scss']
})
export class VolumeViewerComponent implements OnInit {

  constructor() {
    // x3dom.loadJS(null, "", null);

    const b = isEnableWebGL();
   }

  ngOnInit() {
  }

}
