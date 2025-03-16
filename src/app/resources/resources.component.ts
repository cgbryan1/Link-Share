// service layer for resources component
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SueService, SueResponse } from '../sue.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { URLType } from '../sue.service';

@Component({
  selector: 'app-resources',
  // standalone: true,
  imports: [CommonModule],
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css'],
})
export class ResourcesComponent {
  resources: WritableSignal<SueResponse[]> = signal([]);
  // resources: Resource[] = [];

  // resources only works in HTML if it's not a signal but that messes up my code UGH
  // resources: SueResponse[]> = signal([]);

  constructor(private sueService: SueService) {}

  // from the documentation in the reading yay
  ngOnInit() {
    this.sueService.getResources().subscribe({
      next: (data: SueResponse[]) => {
        console.log('Observer received resources:', data);
        this.resources.set(data);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load resources:', error);
        this.resources.set([]); // Prevent UI from breaking
      },
    });
  }

  // LLM GENERATED CODE (thx chat): https://chatgpt.com/share/67cb6760-5df0-8002-88b0-14332acf3aa5
  get resourceList() {
    return this.resources();
  }

  trackByResourceId(index: number, item: SueResponse) {
    return item.resource_id;
  }
}
