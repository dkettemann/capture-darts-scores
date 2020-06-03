import { NgModule } from '@angular/core';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import {FlexLayoutModule} from '@angular/flex-layout';
import { SettingsComponent } from './components/settings/settings.component';
import { ImpressumComponent } from './components/impressum/impressum.component';

@NgModule({
  declarations: [NavigationBarComponent, SettingsComponent, ImpressumComponent],
  exports: [
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
    MatCheckboxModule,
  ]
})
export class CoreModule { }
