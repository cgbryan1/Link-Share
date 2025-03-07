// service layer for resources component
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SueService, SueResponse } from '../sue.service';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent implements OnInit {
  resources: WritableSignal<SueResponse[]> = signal([]);

  constructor(private sueService: SueService) {}

  // from the documentation in the reading yay
  ngOnInit() {
    const observer = {
      next: (response: SueResponse[]) => {
        console.log('Observer received resources:', response);
        this.resources.set(response);
      },
      error: (error: any) => {
        console.error('Observer had an error:', error);
      },
      // not doing complete sry
    };

    this.sueService.getResources().subscribe(observer);
  }
}
