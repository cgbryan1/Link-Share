import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SueResponse, SueService } from '../sue.service';

/**
 * Interface representing a resource submission from the form.
 */
interface ResourceSubmission {
  type: string;
  content: string;
  url?: string;
}

interface receivedURL {
  type: string;
  content: string;
  url?: string;
}

// create new attribute to store recieved url
// create writable signal sue response to store signal and

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './share.component.html',
  styleUrl: './share.component.css',
})
export class ShareComponent implements OnInit {
  shareForm!: FormGroup;

  submittedValues: WritableSignal<ResourceSubmission | null> = signal(null);
  isSubmitted: WritableSignal<boolean> = signal(false);

  receivedValues: WritableSignal<receivedURL | null> = signal(null);

  // TODO Inject your service into the ShareComponent's constructor as a private variable.
  constructor(
    private formBuilder: FormBuilder,
    private sueService: SueService
  ) {}

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      type: ['text', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.shareForm.valid) {
      const resourceType: string = this.shareForm.get('type')?.value;
      const resourceContent: string = this.shareForm.get('content')?.value;

      // TODO: Replace this with actual submission logic!

      if (resourceType == 'url') {
        // this creates a link and then subscribes to it
        this.sueService.createShortURL(resourceContent).subscribe(
          (response: SueResponse) => {
            console.log('HTTP Response:', response);
            this.receivedValues.set({
              type: resourceType,
              content: resourceContent,
              url: `${this.sueService.apiLink}/${response.resource_id}`,
            });
          },
          (error: any) => {
            console.log('HTTP error:', error);
            this.isSubmitted.set(false);
            console.error("Couldn't generate a link", error);
          }
        );
      }

      if (resourceType == 'text') {
        // this creates a pastebin and then subscribes to it
        this.sueService.createPastebin(resourceContent).subscribe(
          (response: SueResponse) => {
            console.log('HTTP Response:', response);
            this.isSubmitted.set(true);
            this.receivedValues.set({
              type: resourceType,
              content: resourceContent,
              url: `${this.sueService.apiLink}/${response.resource_id}`,
            });
          },
          (error: any) => {
            console.log('HTTP error:', error);
            this.isSubmitted.set(false);
            console.error("Couldn't generate a pastebin.", error);
          }
        );
      }
    } // id is optional but should i include?
  }
}
