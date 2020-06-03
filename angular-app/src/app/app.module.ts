import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {NavComponent} from './core/components/sidenavigation/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './sessions/login/login.component';
import {CoreModule} from './core/core.module';
import { ContentComponent } from './core/samples/content/content.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {WindowRef} from './shared/WindowRef';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    WebcamModule,
    LayoutModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    CoreModule,
  ],
  providers: [WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule {
}
