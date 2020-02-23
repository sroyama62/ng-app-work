import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { VolumeViewerComponent } from './components/volume-viewer/volume-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageViewerComponent,
    VolumeViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA ]
})
export class AppModule { }
