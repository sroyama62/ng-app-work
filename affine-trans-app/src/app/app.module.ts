import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayGroundShellComponent } from './containers/play-ground-shell/play-ground-shell.component';
import { TransformSvgComponent } from './components/transform-svg/transform-svg.component';
import { BscanViewerComponent } from './components/bscan-viewer/bscan-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayGroundShellComponent,
    TransformSvgComponent,
    BscanViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
