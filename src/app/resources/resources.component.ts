import { Component } from '@angular/core';

@Component({
  selector: 'app-resources',
  imports: [],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent {
  resources = []; // hold resources that i'm sending back. need to figure out type tho!
}
