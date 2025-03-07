import { Routes } from '@angular/router';
import { ShareComponent } from './share/share.component';
import { ResourcesComponent } from './resources/resources.component';

export const routes: Routes = [
  { path: '', component: ShareComponent },
  { path: 'new-resource', component: ResourcesComponent },
];
