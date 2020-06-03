import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContentComponent} from './core/samples/content/content.component';
import {SettingsComponent} from './core/components/settings/settings.component';
import {ImpressumComponent} from './core/components/impressum/impressum.component';

const routes: Routes = [
  {
    path: '', component: ContentComponent, pathMatch: 'full', children: [
    ]
  },
  {
    path: 'impressum', component: ImpressumComponent, pathMatch: 'full', children: [
    ]
  },
  {
    path: 'settings', component: SettingsComponent, pathMatch: 'full', children: [
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
