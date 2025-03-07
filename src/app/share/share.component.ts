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

// OH: create new attribute to store recieved url
interface receivedURL {
  type: string;
  content: string;
  url?: string;
}

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

  // OH: create writable signal sue response to store signal and
  receivedValues: WritableSignal<receivedURL | null> = signal(null);

  resourceList: WritableSignal<SueResponse[]> = signal([]); // so many signals ugh

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

    this.sueService.getResources().subscribe(
      (response: SueResponse[]) => {
        console.log('Got the resources!', response);
        this.resourceList.set(response); // not update bc it returns full list
      },
      (error) => {
        console.error("Couldn't get resources:", error);
      }
    );
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
            this.isSubmitted.set(true);
            this.receivedValues.set({
              // woo angular
              type: resourceType,
              content: resourceContent,
              url: `${this.sueService.apiLink}/${response.resource_id}`,
            });
          },
          (error: any) => {
            console.log('HTTP error:', error);
            this.isSubmitted.set(false);
            console.error(
              "Couldn't generate a pastebin. Check that you submitted a valid link!",
              error
            );
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
              // woo angular
              type: resourceType,
              content: resourceContent,
              url: `${this.sueService.apiLink}/${response.resource_id}`,
            });
            console.log('type:', this.receivedValues);
          },
          (error: any) => {
            console.log('HTTP error:', error);
            this.isSubmitted.set(false);
            console.error("Couldn't generate a link for your text.", error);
          }
        );
      }
    }
  }
}
