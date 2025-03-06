import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SueService } from '../sue.service';

/**
 * Interface representing a resource submission from the form.
 */
interface ResourceSubmission {
  type: string;
  content: string;
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

      this.sueService.createShareLink(resourceType, resourceContent).subscribe(
        (response: any) => {
          // mad at me for not declaring response/error types
          this.submittedValues.set({
            type: resourceType,
            content: resourceContent,
          });
          this.isSubmitted.set(true);
          this.submittedValues.set({
            type: resourceType,
            content: resourceContent,
          }); // wait did i cook
        },
        (error: any) => {
          this.isSubmitted.set(false);
          console.error("Couldn't generate a link", error);
        }
      );
    } // id is optional but should i include?
    // mid way thru step 5 of part 1 RIP
  }
}
