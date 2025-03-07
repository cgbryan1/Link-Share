import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SueService } from '../sue.service';

interface Resource {
  // same as in share component for now
  type: string;
  content: string;
  url?: string;
}

@Component({
  selector: 'app-resources',
  imports: [],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent {
  resList: WritableSignal<Resource[]> = signal([]); // woooo angular

  constructor(private sueService: SueService) {} // do i need anything else in my constructor? bc it should b auto accessible

  ngOnInit() {
    this.sueService = this.sueService.subscribe(
      (response: Resource[]) => {
        this.resList.set(response);
      },
      (error: any) => {
        console.error("Couldn't get resources:", error);
      }
    );
  }
}
